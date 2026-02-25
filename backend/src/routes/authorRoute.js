import express from "express";
import { addAuthor, getAllAuthor, deleteAuthor, editAuthor, deleteAllAuthor } from "../controller/authorController.js";
const router = express.Router();

router.get("/", getAllAuthor);
router.post("/", addAuthor);
router.delete("/:id", deleteAuthor);
router.put("/:id", editAuthor);
router.delete("/", deleteAllAuthor);

export default router;