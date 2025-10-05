import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";
import http from "http";
import { setupWebSocket } from "./sockets/socket";
import { errorHandler, notFoundHandler } from "./utils/errorHandler";
import { initLogger, requestLogger } from "./utils/logger";

dotenv.config();

const app = express();

const logger = initLogger();
app.locals.logger = logger;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const server = http.createServer(app);
const io = setupWebSocket(server);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

mongoose
  .connect("mongodb://localhost:27017/chatDB")
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur MongoDB :", err));

app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/auth", authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});