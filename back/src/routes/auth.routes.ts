import { register, login, getMe } from "../controllers/auth.controller";
import { RouterBuilder } from "../utils/router-builder";

const router = new RouterBuilder()
  .post("/register", register)
  .post("/login", login)
  .get("/me", getMe)
  .build();

export default router;
