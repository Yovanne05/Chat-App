import {
  create,
  findAll,
  deleteMany,
  findFriends,
  addFriendToUser
} from "../controllers/userController";
import { RouterBuilder } from "../utils/RouterBuilder";

const router = new RouterBuilder()
  .post("/", create)
  .get("/", findAll)
  .delete("/", deleteMany)
  .get("/:id/friends", findFriends)
  .post("/:idUser/friends/:idNewFriend", addFriendToUser)
  .build();

export default router;
