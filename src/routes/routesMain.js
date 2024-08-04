import express from "express";

import verifyRoute from "./verify.js";
import masterRoute from "./master.js";
import docRoute from "./docs.js";

const router = express.Router();

router.use("/", verifyRoute);

//sales-invoice,purchase order, purchase invoice
router.use("/docs", docRoute);

//master
router.use("/master", masterRoute);

export default router;
