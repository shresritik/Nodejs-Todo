import express from "express";
import { login, refresh } from "../controller/auth";
import { validateReqBody } from "../middleware/validator";
import { createAuthSchema } from "../schema/auth";
const router = express();
// route handler to login a user
router.post("/login", validateReqBody(createAuthSchema), login);
// router handler to generate refresh and access token from previous refresh token
router.post("/refresh", refresh);
export default router;
