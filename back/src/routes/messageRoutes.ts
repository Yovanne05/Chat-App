import {
  create,
  findOne,
  findConversation,
  deleteOneMessage,
} from "../controllers/messageController";
import { RouterBuilder } from "../utils/RouterBuilder";

const router = new RouterBuilder()
  .post("/", create)
  .get("/:id", findOne)
  .get("/conversation/:user1/:user2", findConversation)
  .delete("/:id", deleteOneMessage)
  .build();

export default router;
