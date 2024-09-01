import express from "express";

import verifyRoute from "./verify.js";
import masterRoute from "./master.js";
import docRoute from "./docs.js";
import devRoute from "./dev.js";
import userRoute from "./user.js";

const router = express.Router();

//auth and user
router.use("/user", userRoute);

//verify login
router.use("/", verifyRoute);

//sales-invoice,purchase order, purchase invoice
router.use("/docs", docRoute);

//master
router.use("/master", masterRoute);

//dev endpoint
router.use("/dev", devRoute);

export default router;
