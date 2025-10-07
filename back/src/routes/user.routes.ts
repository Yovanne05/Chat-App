import {
  create,
  findMany,
  deleteMany,
  findFriends,
  addFriendToUser
} from "../controllers/user.controller";
import { RouterBuilder } from "../utils/RouterBuilder";

const router = new RouterBuilder()
  .post("/", create)
  .get("/", findMany)
  .delete("/", deleteMany)
  .get("/:id/friends", findFriends)
  .post("/:idUser/friends/:idNewFriend", addFriendToUser)
  .build();

export default router;
