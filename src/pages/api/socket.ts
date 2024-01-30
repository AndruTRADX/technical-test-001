import MessageModel from "@/models/message";
import { connectToDB } from "@/utils/database";
import { Server } from "socket.io";

interface MessageDocument {
  name: string;
  message: string;
  sender: string;
  date: Date;
}

export default function SocketHandler(req: any, res: any) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", async (socket) => {
    try {
      await connectToDB();
      const messages = await MessageModel.find().sort({ date: -1 });

      messages.forEach((msg) => {
        socket.emit("receive-message", msg);
      });
    } catch (error) {
      console.error("Error retrieving messages:", error);
    }

    socket.on("send-message", async (obj: MessageDocument) => {
      try {
        await connectToDB();
        const message = await MessageModel.create(obj);
        io.emit("receive-message", message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
  });

  console.log("Setting up socket");
  res.end();
}
