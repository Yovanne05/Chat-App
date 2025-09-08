import { Router } from "express";
import { createMessage, getMessageById, getConversation, deleteMessage } from "../controllers/messageController";

const router = Router();

router.post("/", createMessage);
router.get("/:id", getMessageById);
router.get("/conversation/:user1/:user2", getConversation);
router.delete("/:id", deleteMessage);

export default router;
