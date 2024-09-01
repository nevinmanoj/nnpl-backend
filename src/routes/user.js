import express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

const tempPass = process.env.TEMP_PASS;
router.use((req, res, next) => {
  /**********for___now**********/
  const authHeader = req.headers.authorization;
  if (authHeader == tempPass) {
    return res.status(200).json({ message: "Access Granted" });
  } else {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  /**********for___now**********/
});
export default router;
