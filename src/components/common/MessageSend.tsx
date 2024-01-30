interface Props {
  messages: message[];
}

type message = {
  content: string;
  date: string;
};

const MessageSend = ({ messages }: Props) => {
  return (
    <div className="flex flex-col w-full justify-center items-end">
      {messages.map((message, index) => (
        <div
          key={`message-send-${index}`}
          className="p-3 mt-2 min-w-[60px] ml-8 flex flex-col justify-center gap-1 items-start border-message-send max-w-[270px] bg-teal-500 shadow-md shadow-teal-300/50"
        >
          <p className="text-white text-base font-medium leading-[20px]">
            {message.content}
          </p>
          <p className="text-gray-100 text-xs">{message.date}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageSend;
