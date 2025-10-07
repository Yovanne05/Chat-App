import {
  create,
  findOne,
  findConversation,
  deleteOneMessage,
} from "../controllers/message.controller";
import { RouterBuilder } from "../utils/router-builder";

const router = new RouterBuilder()
  .post("/", create)
  .get("/:id", findOne)
  .get("/conversation/:user1/:user2", findConversation)
  .delete("/:id", deleteOneMessage)
  .build();

export default router;
