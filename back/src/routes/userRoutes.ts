import {
  createUser,
  getAllUsers,
  deleteAllUsers,
  getFriends,
  addFriendToUser
} from "../controllers/userController";
import { RouterBuilder } from "../utils/RouterBuilder";

const router = new RouterBuilder()
  .post("/", createUser)
  .get("/", getAllUsers)
  .delete("/", deleteAllUsers)
  .get("/:id/friends", getFriends)
  .post("/:idUser/friends/:idNewFriend", addFriendToUser)
  .build();

export default router;
