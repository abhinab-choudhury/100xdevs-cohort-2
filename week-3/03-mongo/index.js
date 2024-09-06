const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 8080;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const DATABASE_NAME = process.env.DATABASE_NAME;

(async () => {
  // Connect to MongoDB
  console.log(MONGODB_CONNECTION_STRING + "/" + DATABASE_NAME);
  const connectionInstance = await mongoose.connect(
    `${MONGODB_CONNECTION_STRING}/${DATABASE_NAME}`,
  ).catch((error) => {
    console.error(error);
    throw Error("Connection Error");
  });
  console.log("MongoDB Running on PORT:", connectionInstance.connection.port);

  // Start Express Server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
