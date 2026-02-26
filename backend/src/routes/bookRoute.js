import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllBook,
  getBookById,
  addBook,
  deleteBook,
  deleteAllBook,
  getUserBooks,
  getMyBooks,
  editBook,
} from "../controller/bookController.js";
import { authorize, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const safeName = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype?.startsWith("image/")) {
    cb(null, true);
    return;
  }

  cb(new Error("Only image uploads are allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/getuserbooks/:id", getUserBooks);
router.get("/getmybooks", verifyToken, getMyBooks);
router.get("/", getAllBook);
router.get("/:id", getBookById);

router.post("/", verifyToken, upload.single("image"), addBook);
router.put("/edit/:id", verifyToken, editBook);
router.delete("/:id", verifyToken, deleteBook);
router.delete("/", verifyToken, authorize("admin"), deleteAllBook);

export default router;
