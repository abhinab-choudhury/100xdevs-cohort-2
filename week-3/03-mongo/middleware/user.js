const { Admin, User } = require("../db");
const { userSchema } = require("./../zodSchemas/schemas");

async function userMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { email, password } = req.headers;
  if (!email || !password || email?.trim() === "" || password?.trim() === "") {
    res.status(500).json({
      success: false,
      message: "Email and Password is required",
    });
    return;
  }
  const isValidCredentials = userSchema.safeParse({ email, password });

  if (!isValidCredentials) {
    res.status(411).json({
      success: false,
      message: "Invalid Credentials",
    });
    return;
  } else {
    const isUser = await User.findOne({ email, password });
    if (!isUser) {
      res.status(400).json({
        success: false,
        message: "Invalid User",
      });
      return;
    }
    req.user = email;
  }
  next();
}

module.exports = userMiddleware;

