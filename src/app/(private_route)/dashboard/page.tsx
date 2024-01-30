"use client";

import { DefaultEventsMap } from "@socket.io/component-emitter";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

import { CameraIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Message from "@/components/common/Message";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
interface MessageData {
  username: string;
  message: string;
}

const Home = () => {
  const { data } = useSession();

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(data?.user?.name);
  const [allMessages, setAllMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data: MessageData) => {
      setAllMessages((pre: MessageData[]) => [...pre, data]);
    });
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    console.log("emitted");

    socket.emit("send-message", {
      username,
      message,
    });
    setMessage("");
  }

  return (
    <div className="flex flex-col w-full border-x border-gray-300">
      {
        <div className="w-full h-full p-6 flex flex-col overflow-y-auto">
          {allMessages.map(({ username, message }, index) => (
            <Message key={index} messages={message} username={username} />
          ))}
        </div>
      }

      <div className="flex justify-between gap-x-8 items-center w-full border-y border-gray-300 p-6">
        <button>
          <CameraIcon className="w-6 h-6 text-gray800" />
        </button>

        <form
          className="w-full flex items-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            className="chat-textarea"
            placeholder="Type a message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
          <button
            type="submit"
            className="bg-primary/10 w-10 h-10 flex justify-center items-center rounded-full"
          >
            <PaperAirplaneIcon className="w-6 h-6 text-primary" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
