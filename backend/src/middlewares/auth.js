import pkg from "jsonwebtoken";
const { verify } = pkg;
import User from "../models/User.js";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).send("Please Login");
    }

    const decodedToken = verify(token, process.env.JWT_SECRET);
    const userInfo = await User.findById({ _id: decodedToken.userId });

    if (!userInfo) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    req.currentUser = { id: userInfo._id, email: userInfo.email };
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Authentication failed",
        error: error.message,
      });
  }
};

export default userAuth;
