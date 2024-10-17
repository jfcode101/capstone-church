// bring in express and user controller
import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser); // user registration
router.post("/login", loginUser); // user login

export default router;
