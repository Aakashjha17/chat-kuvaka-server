import * as chatController from "../controller/chat.controller";
import express from "express";

const router = express.Router();

router.get("/get-chat", chatController.getChat);

export default router;
