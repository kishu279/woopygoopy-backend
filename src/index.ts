import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import socketHandler from "./socket/socketHandler";
import prisma from "./config/prisma";
import leaderboardRouter from "./routes/leaderboardRoutes";
import userRouter from "./routes/registerRoute";
import getUser from "./routes/getUserRoute";
import loginRouter from "./routes/loginRoute";
import setPlantRouter from "./routes/setPlant";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.use("/api/user/register", userRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/user-details", getUser);
app.use("/api/user/login", loginRouter);
app.use("/api/user/set", setPlantRouter);

socketHandler(io, prisma);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
