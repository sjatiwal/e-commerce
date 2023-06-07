const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then((data) => {
      console.log(`${data.connection.host}`);
    });
  // .catch((err) => {
  //   console.log(err);
  // });
};

module.exports = connectDatabase;
