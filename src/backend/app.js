const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser");
//const fileupload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

// routes import
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const product = require("./routes/productsRoute");
const user = require("./routes/userRoute");

// config

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(fileupload());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
