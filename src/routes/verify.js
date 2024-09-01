import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tempPass = process.env.TEMP_PASS;
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

router.use((req, res, next) => {
  /**********for___now**********/

  const authHeader = req.headers.authorization;

  if (authHeader === tempPass) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized Access" });
  }

  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res.status(401).json({ message: "Invalid header" });
  // }
  // const token = authHeader.split(" ")[1];
  // try {
  //   const decoded = jwt.verify(token, jwtSecret);
  //   req.decoded = decoded;
  //   next();
  // } catch (error) {
  //   console.error(error);
  //   res.status(401).json({ message: "Unauthorized Access" });
  // }
  /**********for___now**********/
});
export default router;
