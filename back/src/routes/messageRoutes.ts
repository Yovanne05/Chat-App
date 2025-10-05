import {
  createMessage,
  getMessageById,
  getConversation,
  deleteMessage,
} from "../controllers/messageController";
import { RouterBuilder } from "../utils/RouterBuilder";

const router = new RouterBuilder()
  .post("/", createMessage)
  .get("/:id", getMessageById)
  .get("/conversation/:user1/:user2", getConversation)
  .delete("/:id", deleteMessage)
  .build();

export default router;
