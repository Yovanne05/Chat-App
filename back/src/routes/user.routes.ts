import {
  create,
  findMany,
  deleteMany,
  findFriends,
  removeFriend
} from "../controllers/user.controller";
import { RouterBuilder } from "../utils/router-builder";

const router = new RouterBuilder()
  .post("/", create)
  .get("/", findMany)
  .delete("/", deleteMany)
  .get("/:id/friends", findFriends)
  .delete("/:idUser/remove-friends/:friendId", removeFriend)
  .build();

export default router;
