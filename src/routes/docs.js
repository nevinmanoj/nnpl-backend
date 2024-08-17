import express from "express";
import { getAllDocs, getDoc, getExcel } from "../controllers/doc/getDoc.js";
import { deleteDoc } from "../controllers/doc/deleteDoc.js";
import { addDoc } from "../controllers/doc/createDoc.js";
import { modifyDoc } from "../controllers/doc/updateDocs.js";

const router = express.Router();

router.get("/:item/", getAllDocs);
router.get("/:item/:id", getDoc);
router.get("/:item/:id/excel", getExcel);
router.post("/:item", addDoc);
router.put("/:item/:id", modifyDoc);
router.delete("/:item/:id", deleteDoc);

export default router;
