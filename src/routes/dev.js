import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({ data: "welcome to dev area" });
});

export default router;
