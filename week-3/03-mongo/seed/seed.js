const mongoose = require("mongoose");
const { User, Admin } = require("../db");

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const DATABASE_NAME = process.env.DATABASE_NAME;

async function seedDatabase() {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_CONNECTION_STRING}/${DATABASE_NAME}`,
    );
    console.log("MongoDB Running on PORT:", connectionInstance.connection.port);

    const users = [
      { email: "example@gmail.com", password: "example" },
      { email: "abhinab@gmail.com", password: "abhinab" },
      { email: "rahul@gmail.com", password: "rahul" },
      { email: "jasmin@gmail.com", password: "jasmin" },
      { email: "malika@gmail.com", password: "malika" },
    ];
    await User.insertMany(users).then(() => {
      console.log("User Data Inserted");
    });

    const adminUsers = await User.findOne({ email: "example@gmail.com" });

    await Admin.create({
      user: adminUsers._id,
    }).then(() => {
      console.log("Admin User Added");
    });
  } catch (error) {
    console.error("Error occurred while inserting User Data:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
