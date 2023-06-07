const express = require("express");
const {
  changePassword,
  deleteReview,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getProductReviews,
  getUser,
  getUserDetails,
  loginUser,
  logoutUser,
  productReview,
  registerUser,
  resetPassword,
  updateProfile,
  updateUserRole,
} = require("../controllers/userCotroller");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getUser)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/register").post(registerUser);
router.route("/review").put(isAuthenticatedUser, productReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
