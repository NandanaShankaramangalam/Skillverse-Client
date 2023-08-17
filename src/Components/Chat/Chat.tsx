import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { api } from "../../services/axios";
import { Chats } from "../../domain/models/chatModel";
import { useSelector } from "react-redux";
import { Message } from "../../domain/models/chatModel";
interface role {
  role: string;
}
function Chat(props: role) {
  const ENDPOINT = process.env.REACT_APP_BASE_URL as string;

  let socket: any = io(ENDPOINT);

  const { studId } = useSelector((state: any) => state.student);
  const { tutId } = useSelector((state: any) => state.tutor);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessages] = useState<string>("");
  const [chatId, setChatId] = useState("");
  const [tutName, setTutName] = useState("");
  const [studName, setStudName] = useState("");
  const [tutImg, setTutImg] = useState("");
  const [chats, setChats] = useState<Chats[]>([]);
  const [selectedUser, setselectedUser] = useState<Chats>();
  const currentUserId = props.role === "student" ? studId : tutId;

  useEffect(() => {
    socket.emit("setup", currentUserId);
  }, [currentUserId, socket]);

  const selectChat = (user: Chats) => {
    setselectedUser(user);
  };

  const setMessageFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessages(e.target.value);
    console.log("kkk", newMessage);
  };

  useEffect(() => {
    const fetch = async () => {
      if (props.role === "student") {
        const data = await api.get(`/chat/student-chat/${studId}`);
        console.log("stchat=", data.data);
        setChats(data.data.allChats);
        console.log("chts=", chats);
      } else {
        const data = await api.get(`/chat/tutor-chat/${tutId}`);
        console.log("tutchat=", data.data);
        setChats(data.data.allChats);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessage: Message) => {
      console.log("got new message");

      if (chatId !== newMessage.chat._id) {
        console.log(
          `Message from ${newMessage.student?.firstName} ${newMessage.student?.firstName}`
        );
      } else {
        setMessages([...messages, newMessage]);
      }
    });
  }, [socket, messages]);
  //Fetch All Messages
  const handleMessageFetch = async (chatId: string) => {
    console.log("chtid=", chatId);
    const { data } = await api.get(`/message/${chatId}`);
    console.log("okyyy=", data.messages);
    setMessages(data.messages);
    socket.emit("join chat", chatId);
  };

  //Message sending
  const sendMessage = async (
    content: string,
    chatId: string,
    currentuserId: string
  ) => {
    const currentRole = props.role;
    const { data } = await api.post(`/message/send`, {
      content,
      chatId,
      currentUserId,
      currentRole,
    });
    return data;
  };

  const handleMessageSent = async () => {
    console.log("sss");

    if (newMessage.trim().length > 0) {
      const res = await sendMessage(newMessage, chatId, currentUserId);
      console.log("Got the message response", res);
      setNewMessages("");
      socket?.emit("new message", res.msg);
      setMessages([...messages, res.msg]);
    }
  };

  return (
    <div className="container mx-auto">
      <div className={`min-w-full border rounded lg:grid lg:grid-cols-3`}>
        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3 ">
            {/* <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                required
              />
            </div> */}
          </div>

          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            {props.role === "student"
              ? chats.map((obj) => (
                  <li
                    key={obj._id}
                    onClick={() => {
                      selectChat(obj);
                      setChatId(obj._id);
                      handleMessageFetch(obj._id);
                      setTutName(obj.tutor.username);
                      setTutImg(obj.tutor.profileLocation);
                    }}
                  >
                    <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={`${process.env.REACT_APP_S3BUCKET_URL}/${obj.tutor.profileLocation}`}
                        alt="username"
                      />
                      <div className="w-full pb-2">
                        <div className="flex justify-between">
                          <span className="block ml-2 font-semibold text-gray-600">
                            {obj.tutor.username}
                          </span>
                        </div>
                        <span className="block ml-2 text-sm text-gray-600">
                          {obj.latestMessage?.content}
                        </span>
                      </div>
                    </a>
                  </li>
                ))
              : chats.map((obj) => (
                  <li
                    key={obj._id}
                    onClick={() => {
                      selectChat(obj);
                      setChatId(obj._id);
                      handleMessageFetch(obj._id);
                      setStudName(obj.student.username);
                    }}
                  >
                    <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                      <img
                        className="object-cover w-10 h-10 rounded-full border border-gray-400"
                        src="/images/nophoto.png"
                        alt="username"
                      />
                      <div className="w-full pb-2">
                        <div className="flex justify-between">
                          <span className="block ml-2 font-semibold text-gray-600">
                            {obj.student.username}
                          </span>
                        </div>
                        <span className="block ml-2 text-sm text-gray-600">
                          {obj.latestMessage?.content}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
          </ul>
        </div>
        {studName || tutName ? (
          <div className="hidden lg:col-span-2 lg:block">
            <div className="w-full">
              {props.role === "student" ? (
                <div className="relative flex items-center p-3 border-b border-gray-300">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={`${process.env.REACT_APP_S3BUCKET_URL}/${tutImg}`}
                    alt="username"
                  />
                  <span className="block ml-2 font-bold text-gray-600">
                    {tutName}
                  </span>
                  <span className="absolute w-3 h-3 rounded-full left-10 top-3"></span>
                </div>
              ) : (
                <div className="relative flex items-center p-3 border-b border-gray-300">
                  <img
                    className="object-cover w-10 h-10 rounded-full border border-gray-300"
                    src="/images/nophoto.png"
                    alt="username"
                  />
                  <span className="block ml-2 font-bold text-gray-600">
                    {studName}
                  </span>
                  <span className="absolute w-3 h-3 rounded-full left-10 top-3"></span>
                </div>
              )}

              <div className="relative w-full p-6 overflow-y-auto h-[30rem]">
                <ul className="space-y-2">
                  {props.role === "student"
                    ? messages.map((obj) => (
                        <li
                          key={obj._id}
                          className={`${
                            obj.student?._id &&
                            obj.student?._id === currentUserId
                              ? "justify-end"
                              : "justify-start"
                          } flex `}
                        >
                          <div
                            className={`relative max-w-xl px-4 py-2 text-gray-700 rounded shadow 
                  ${
                    obj.student?._id && obj.student?._id === currentUserId
                      ? "bg-gray-100"
                      : ""
                  }`}
                          >
                            <span className="block">{obj.content}</span>
                          </div>
                        </li>
                      ))
                    : messages.map((obj) => (
                        <li
                          className={`${
                            obj.tutor?._id && obj.tutor?._id === currentUserId
                              ? "justify-end"
                              : "justify-start"
                          } flex `}
                        >
                          <div
                            className={`relative max-w-xl px-4 py-2 text-gray-700 rounded shadow 
                  ${
                    obj.tutor?._id && obj.tutor?._id === currentUserId
                      ? "bg-gray-100"
                      : ""
                  }`}
                          >
                            <span className="block">{obj.content}</span>
                          </div>
                        </li>
                      ))}
                </ul>
              </div>

              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <input
                  type="text"
                  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  onChange={(e) => setMessageFn(e)}
                  value={newMessage}
                  required
                />

                <button
                  type="submit"
                  onClick={() => {
                    handleMessageSent();
                  }}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className=" w-full col-span-2 pt-32">
            <div className="flex justify-center  w-full">
              <img src="/images/chat.png" alt="" className="h-56" />
            </div>
            <div className="pt-3 gap-y-2 text-center">
              <h1 className="text-2xl font-semibold">You have messages</h1>
              <h1 className="text-gray-500">Select a conversation to read</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
