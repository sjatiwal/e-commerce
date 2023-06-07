const catchAsyncError = require("../middleware/catchAsyncErrors");
//const cloudinary = require("cloudinary");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");
const sendEmail = require("../utils/sendEmail");
const sendToken = require("../utils/jwtToken");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// User Registration
exports.registerUser = catchAsyncError(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatar",
  //   width: 150,
  //   crop: "scale",
  // });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "id", // myCloud.public_id,
      url: "url", //myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

// Logout

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get resestPasswordToken
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your Password Reset Token is : \n\n ${resetPasswordUrl} \n\n If you did not request to change password ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.send({
      message: "Email Send Successfully",
    });
  } catch (error) {
    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpired = undefined);
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpired: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next("Password does not match", 400);
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpired = undefined;

  await user.save();
  sendToken(user, 200, res);
});

// user Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  sendToken(user, 200, res);
});

// Change Password
exports.changePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is Incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Does Not Match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//  Update Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // if (req.body.avatar !== "") {
  //   const user = await User.findById(req.user.id);
  //   const imageId = user.avatar.public_id;
  //   await cloudinary.v2.uploader.destroy(imageId);

  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: "avatar",
  //     width: 150,
  //     crop: "scale",
  //   });
  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   };
  // }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get All Users (Admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single Users (Admin)
exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`No User Found`));
  }

  res.status(200).json({
    user,
  });
});

//  Update User Role Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    // name: req.body.name,
    // email: req.body.email,
    role: req.body.role,
  };

  // let user = User.findById(req.params.id);

  // if (!user) {
  //   return next(
  //     new ErrorHandler(`User Does not exist with Id: ${req.params.id}`, 400)
  //   );
  // }

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: false,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User Role Updated Successfuly",
  });
});

// Delete User
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`No User Found`));
  }

  //   const imageId = user.avatar.public_id;
  //   await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();
  res.status(200).json({
    success: true,
    message: "User has been Deleted Successfully",
  });
});

// Review
exports.productReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const product = await Product.findById(productId);

  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeData.id);

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const isReviewed = product.review.map((rev) => {
    if (rev.user.toString() === req.user._id.toString()) {
      return true;
    } else {
      return false;
    }
  });

  if (isReviewed.includes(true)) {
    product.review.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) rev.rating = rating;
      rev.comment = comment;
    });
  } else {
    product.review.push(review);
    product.numOfReviews = product.review.length;
  }

  let avg = 0;
  product.review.forEach((rev) => {
    avg += rev.rating;
  });

  if (review.length === 0) {
    product.rating = 0;
  } else {
    product.rating = avg / product.review.length;
  }

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a Product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({ success: true, reviews: product.review });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return new ErrorHandler("Product Not Found", 404);
  }

  const review = product.review.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  review.forEach((rev) => {
    avg += rev.rating;
  });
  const rating = avg / review.length;

  const numOfReviews = review.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      review,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({ success: true });
});
