import { register, login, getMe, logout } from "../controllers/authController";
import { RouterBuilder } from "../utils/RouterBuilder";

const router = new RouterBuilder()
  .post("/register", register)
  .post("/login", login)
  .post("/logout", logout)
  .get("/me", getMe)
  .build();

export default router;
