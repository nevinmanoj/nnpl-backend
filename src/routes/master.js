import express from "express";
import {
  getItemOptions,
  addItem,
  getItem,
  updateItem,
} from "../controllers/master.js";

const router = express.Router();

router.get("/:item", getItemOptions);
router.get("/:item/:id", getItem);
router.post("/:item", addItem);
router.put("/:item", updateItem);
// router.delete('/:id', deletePo);

export default router;
