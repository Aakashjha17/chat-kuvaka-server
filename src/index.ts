import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDb from "./config/db.config";
import { Server } from "socket.io";
import chatRoutes from "./routes/chat.route";
import chatModel from "./model/chat.model"; // Import the chat model

const PORT = process.env.PORT;

function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  console.error(err);

  res.status(500).json({
    response: "Error",
    message: err.message || "Internal Server Error",
  });
}

async function bootstrap() {
  const dbConnection = await connectDb();
  const app = express();

  app.use(
    express.json({
      limit: "100mb",
    })
  );
  app.use(express.urlencoded({ extended: true, limit: "100mb" }));
  app.use(errorHandler);

  app.use(cors({ origin: "*" }));
  app.use("/api/chat", chatRoutes);

  app.get("/health", (_req: Request, res: Response) =>
    res.status(200).json({ status: "ok" })
  );

  const server = app.listen(PORT, async () => {
    console.log(`Listening on PORT ${PORT}`);
  });

  server.on("error", (err) => {
    console.log(`Error: ${err}`);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("chatMessage", async (data: { name: string; text: string }) => {
      try {
        const { name, text } = data;
        const chatData = new chatModel({ name, text });
        await chatData.save();
        socket.broadcast.emit("receiveChatMessage", chatData);
      } catch (err) {
        console.error("Error handling chat message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  const gracefulShutdown = async () => {
    console.log("Received shutdown signal. Shutting down Gracefully.");
    await dbConnection.disconnect();
    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(1);
    });
  };

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
}

bootstrap();
