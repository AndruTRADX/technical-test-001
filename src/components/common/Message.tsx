import { useSession } from "next-auth/react";

interface Props {
  messages: string;
  username: string;
}

const Message = ({ messages, username }: Props) => {
  const { data } = useSession();
  const isUser = data?.user?.name === username;

  return (
    <>
      {isUser ? (
        <>
          <div className="flex flex-col w-full justify-center items-end">
            <div className="p-3 mt-2 min-w-[60px] ml-8 flex flex-col justify-center gap-1 items-start border-message-send max-w-[270px] bg-teal-500 shadow-md shadow-teal-300/50">
              <p className="text-white text-base font-medium leading-[20px]">
                {messages}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col w-full justify-center items-start">
            <div className="p-3 mt-2 min-w-[60px] mr-8 flex flex-col justify-center gap-1 items-start border border-message-received border-gray-300 bg-white shadow-md shadow-gray-300/50 max-w-[320px]">
              <p className="text-teal-600 text-sm font-medium text-start w-full">
                {username}
              </p>
              <p className="text-gray-600 text-base font-medium">{messages}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Message;
