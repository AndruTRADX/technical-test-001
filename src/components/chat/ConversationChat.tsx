"use client";

import MessageReceived from "@/components/common/Message";
import MessageSend from "@/components/common/MessageSend";

const messageSend1 = [
  {
    content: "Hi",
    date: "9:02",
  },
  {
    content: "How is everything?",
    date: "9:02",
  },
];

const MessageReceived1 = [
  {
    content: "Hi!",
    date: "9:02",
  },
  {
    content: "Good, thanks for asking",
    date: "9:02",
  },
];

const ConversationChat = () => {
  return (
    <div className="w-full h-full p-6 flex flex-col overflow-y-auto">
      <MessageSend messages={messageSend1} />
      <MessageReceived messages={MessageReceived1} />
    </div>
  );
};

export default ConversationChat;
