const connectDatabase = require("./config/database");
//const cloudinary = require("cloudinary");

const app = require("./app");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  process.exit(1);
});

//connect to database
connectDatabase();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const server = app.listen(
  process.env.PORT,

  () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
  }
);

// unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
  server.close(() => {
    process.exit(1);
  });
});
