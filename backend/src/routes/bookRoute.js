import express from "express";
import multer from "multer";
import path from "path";
import { getAllBook, addBook, deleteBook, deleteAllBook, getUserBooks, getMyBooks, editBook } from "../controller/bookController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
const app = express();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
router.post("/api/books", verifyToken, upload.single("image"), addBook);


// Routes
router.get("/getuserbooks/:id", getUserBooks);
router.get("/getmybooks", getMyBooks);
router.get("/", getAllBook);
router.put("/edit/:id", editBook);

router.post("/",  upload.single("image"), addBook);

router.delete("/:id", deleteBook);
router.delete("/", deleteAllBook);

export default router;
