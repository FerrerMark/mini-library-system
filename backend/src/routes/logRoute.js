import { userlogin, userLogOut } from "../controller/loginController.js";

import express from "express";
const router = express.Router();

router.post("/login", userlogin)
router.post("/logout", userLogOut)

export default router;