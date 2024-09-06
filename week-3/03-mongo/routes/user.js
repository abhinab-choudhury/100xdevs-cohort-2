const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { userSchema } = require("../zodSchemas/schemas");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { email, password } = req?.body;
  const isValid = userSchema.safeParse({ email, password });
  if (!isValid) {
    res.status(411).json({
      success: false,
      message: "Invalid User Input",
    });
    return;
  }
  // if the user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(411).json({
      success: false,
      message: "The Email is Already in use",
    });
    return;
  }
  try {
    await User.create({
      email,
      password,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
  res.status(201).json({
    success: true,
    message: "User created successfully",
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const { email, password } = req?.headers;
  const isValid = userSchema.safeParse({ email, password });
  if (!isValid) {
    res.status(411).json({
      success: false,
      message: "Invalid User Input",
    });
  }

  try {
    const allCourses = await Course.find({});
    if (!allCourses) {
      res.status(500).json({
        success: false,
        message: "Failed to get Courses",
      });
    }
    res.status(200).json({
      success: true,
      courses: allCourses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const isValidCourseId = await Course.findOne({ _id: courseId });
  if (!isValidCourseId) {
    res.status(411).json({
      success: false,
      message: "Invalid Course",
    });
    return;
  }
  try {
    const userCourse = await User.findOne({ email: req.user });
    console.log(userCourse);
    if (userCourse.purchase.includes(courseId)) {
      res.status(400).json({
        success: false,
        message: "Already purchase",
      });
      return;
    }
    userCourse.purchase.push(courseId);
    await userCourse.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    return;
  }
  res.status(200).json({
    success: true,
    message: "Purchase complete!",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic

  const user = await User.findOne({ email: req.user });
  try {
    if (user) {
      const allCourses = await Course.find({
        _id: {
          "$in": user.purchase,
        },
      });
      console.log("All Courses : ", allCourses);
      res.status(200).json({ courses: allCourses });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
