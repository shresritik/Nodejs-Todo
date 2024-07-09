import express from "express";
import { login, refresh } from "../controller/auth";
const router = express();
// route handler to login a user
router.post("/login", login);
// router handler to generate refresh and access token from previous refresh token
router.post("/refresh", refresh);
export default router;
