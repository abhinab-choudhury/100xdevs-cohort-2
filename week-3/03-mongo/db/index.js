const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Define schema
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true, timeseries: true });

const UserSchema = new mongoose.Schema({
  // Schema definition here
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  purchase: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },
  ],
}, { timestamps: true, timeseries: true });

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  title: {
    type: String,
    require: true,
    unique: true,
    default: "Unknows",
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  image_link: {
    type: String,
    require: true,
  },
}, { timeseries: true, timestamps: true });

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
