const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://sahilabcd60:sahilmn@sahilmn.6nkidrb.mongodb.net/jobboard", {})
    .then(() => {
      console.log(`MongoDB connected successfully`);
    })
    .catch((error) => {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    });
};

module.exports = connectDatabase;
