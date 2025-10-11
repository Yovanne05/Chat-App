import {
  acceptFriendRequest,
  cancelFriendRequest,
  getFriendshipStatus,
  listFriendRequests,
  rejectFriendRequest,
  sendFriendRequest,
} from "../controllers/friend-request.controller";
import { RouterBuilder } from "../utils/router-builder";

const router = new RouterBuilder()
  .post("/", sendFriendRequest)
  .get("/status", getFriendshipStatus)
  .get("/:userId", listFriendRequests)
  .patch("/:requestId/accept", acceptFriendRequest)
  .patch("/:requestId/reject", rejectFriendRequest)
  .delete("/:requestId", cancelFriendRequest)
  .build();

export default router;
