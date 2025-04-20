import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";

const app = express();

// TODO : Middleware à faire
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/chatDB")
    .then(() => console.log("MongoDB connecté"))
    .catch((err) => console.error("Erreur MongoDB :", err));

app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
