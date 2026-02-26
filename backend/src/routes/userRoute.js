import { addUser, editUser, getAllUsers, deleteUser, deleteAllUser } from "../controller/userController.js";
import { authorize, verifyToken } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/", verifyToken, authorize("admin"), getAllUsers);
router.post("/", addUser);
router.put("/:id", verifyToken, editUser);
router.delete("/deleteall", verifyToken, authorize("admin"), deleteAllUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
