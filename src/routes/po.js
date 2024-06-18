import express from 'express';
import {getpos,getposById,addPo,modifyPo,deletePo} from "../controllers/po.js"

const router = express.Router();

router.get('/', getpos);
router.get('/:id',getposById)
router.post('/', addPo);
router.put('/:id', modifyPo);
router.delete('/:id', deletePo);

export default router;