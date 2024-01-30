import {
  CameraIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import ConversationChat from "./ConversationChat";

const Chat = () => {
  return (
    <div className="flex flex-col w-full border-x border-gray-300">
      <ConversationChat />

      <div className="flex justify-between gap-x-8 items-center w-full border-y border-gray-300 p-6">
        <button>
          <CameraIcon className="w-6 h-6 text-gray800" />
        </button>

        <form className="w-full flex items-center gap-4">
          <textarea className="chat-textarea" placeholder="Type a message" />
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

export default Chat;
