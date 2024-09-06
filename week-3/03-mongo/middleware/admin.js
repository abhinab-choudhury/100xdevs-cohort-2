const { Admin, User } = require("../db");
const { userSchema } = require("./../zodSchemas/schemas");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
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
      message: "Invalid Credentials",
    });
    return;
  } else {
    try {
      const isUser = await User.findOne({ $and: [{ email }, { password }] });
      if (isUser) {
        const isAdmin = await Admin.findOne({ user: isUser._id });
        if (!isAdmin) {
          res.status(403).json({ mesage: "Unauthorized Access" });
          return;
        }
        req.user = email;
      }
    } catch (error) {
      res.status(500).json({
        success: "false",
        message: "Internal Server Error",
      });
    }
  }
  next();
}

module.exports = adminMiddleware;
