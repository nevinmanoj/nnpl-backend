import express from "express";

import poRoutes from "./po.js";
import verifyRoute from "./verify.js";
import masterRoute from "./master.js";

const router = express.Router();

// app.use("/", verifyRoute);

//purchase order
router.use("/po", poRoutes);

//master
router.use("/master", masterRoute);

export default router;
