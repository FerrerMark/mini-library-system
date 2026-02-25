import { getAllOwnerBook } from "../controller/OwnerBookController";
import express from "express";
const router = express.Router();

router.get("/", getAllOwnerBook);

export default router;