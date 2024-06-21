import express from "express";
import { getItems, addItem, updateItem } from "../controllers/master.js";

const router = express.Router();

router.get("/:item", getItems);
// router.get('/:id',getposById)
router.post("/:item", addItem);
router.put("/:item", updateItem);
// router.delete('/:id', deletePo);

export default router;
