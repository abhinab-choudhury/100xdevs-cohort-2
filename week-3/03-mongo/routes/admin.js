const { Router } = require("express");
const { userSchema, courseSchema } = require("./../zodSchemas/schemas");
const adminMiddleware = require("../middleware/admin");
const { User, Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { email, password } = req.body;
  const isValidCredentials = userSchema.safeParse({ email, password });
  if (!isValidCredentials.success) {
    console.error("Error : ", isValidCredentials.error);
    res.status(411).json({
      success: false,
      message: "Invalid Inputs Provided",
    });
    return;
  }
  try {
    // Case 1: if the user signup as admin form the beginning
    // Case 2: if the user signup as normal user initially than latest decides to be admin

    // if the user want to signup as admin from the beginning we create a user and then set him
    // as an admin

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, password });
    }
    // Check if the admin signup is already an admin
    const isAdmin = await Admin.findOne({ user: user._id });
    if (isAdmin) {
      res.status(200).json({
        success: true,
        message: "Already an Admin",
      });
      return;
    }

    await Admin.create({ user: user._id });
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.log("Error occured :", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, image_link } = req.body;

  const isValidCourse = courseSchema.safeParse({
    title,
    description,
    price,
    image_link,
  });
  if (!isValidCourse) {
    res.status(411).json({
      message: "Invalid Course Details",
    });
    return;
  }
  try {
    const owner = await User.findOne({ email: req?.user });
    const newCourse = await Course.create({
      owner: owner._id,
      title,
      description,
      price,
      image_link,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const owner = await User.findOne({ email: req?.user });
    const courses = await Course.find({ owner: owner._id });

    res.status(200).json({ courses: courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
