interface Props {
  messages: message[];
}

type message = {
  content: string;
  date: string;
};

const MessageReceived = ({ messages }: Props) => {
  return (
    <div className="flex flex-col w-full justify-center items-start">
      {messages.map((message, index) => (
        <div
          key={`message-received-${index}`}
          className="p-3 mt-2 min-w-[60px] mr-8 flex flex-col justify-center gap-1 items-start border border-message-received border-gray-300 bg-white shadow-md shadow-gray-300/50"
        >
          <p className="text-gray-800 text-base font-medium">
            {message.content}
          </p>
          <p className="text-gray-500 text-xs">{message.date}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageReceived;
