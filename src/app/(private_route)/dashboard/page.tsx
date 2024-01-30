"use client";

import { DefaultEventsMap } from "@socket.io/component-emitter";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

import { CameraIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Message from "@/components/common/Message";
import AuthProfileMenu from "@/components/common/AuthProfileMenu";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
interface MessageData {
  username: string;
  message: string;
  email: string;
}

const Home = () => {
  const { data } = useSession();

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState<MessageData[]>([]);

  const username = data?.user?.name;
  const email = data?.user?.email;

  const userDataCharged = username && email;

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
      email,
    });
    setMessage("");
  }

  return (
    <div className="flex flex-col w-full border-x border-gray-300">
      <div className="flex items-center justify-between gap-2 border-b border-gray-300 px-5 py-3 text-gray-600">
        <div className="flex items-center gap-2">
          <div
            className={`${
              userDataCharged ? "bg-green-500" : "bg-orange-500"
            } w-3 h-3 rounded-full`}
          />
          <p>
            <span className="font-medium ">
              {`${username || '...'} - ${email || '...'}`}
            </span>
          </p>
        </div>

        <AuthProfileMenu />
      </div>
      {
        <div className="w-full h-full p-6 flex flex-col overflow-y-auto">
          {allMessages.map(({ username, message }, index) => (
            <Message key={index} messages={message} username={username} />
          ))}
        </div>
      }

      <div className="flex justify-between gap-x-8 items-center w-full border-y border-gray-300 p-6">
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
