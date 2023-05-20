import { useEffect, useState } from "react";
import ContactList from "../components/contactList";
import Chat from "../components/chat";
import Form from "../components/form";
import { useNavigate } from "react-router-dom";
import recieveNotification from "../functions/recieveNotification";
import { ChatPageProps, ChatI } from "../interfaces/interfaces";

const ChatPage = ({
  idInstance,
  apiTokenInstance,
  setIdInstance,
  setApiTokenInstance,
}: ChatPageProps) => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [chats, setChats] = useState<ChatI[]>([]);
  const [selectedChat, setSelectedChat] = useState<string>("");
  const [filteredChat, setFilteredChat] = useState<ChatI[]>([]);

  const createChat = () => {
    setChats((prev) => [
      ...prev,
      {
        phoneNumber: phoneNumber,
        messages: [],
      },
    ]);
    setSelectedChat(phoneNumber);
  };

  useEffect(() => {
    setFilteredChat(chats?.filter((chat) => chat.phoneNumber === selectedChat));
  }, [selectedChat, chats]);

  useEffect(() => {
    if (idInstance === "" || apiTokenInstance === "") {
      navigate("/");
    } else {
      const fetchData = async () => {
        await recieveNotification(setChats, idInstance, apiTokenInstance);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", width: "100rem", margin: "0 auto" }}>
      <div style={{ width: "30rem", background: "#111b21" }}>
        <div
          style={{
            display: "flex",
            padding: "1rem 1rem",
            height: "3rem",
            backgroundColor: "rgb(42, 57, 66)",
          }}
        ></div>
        <Form setValue={setPhoneNumber} name="новый чат" onClick={createChat} />
        <ContactList
          chats={chats}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
        />
      </div>
      <div
        style={{
          backgroundColor: "#344651",
          height: "100vh",
          flex: "1 0 auto",
        }}
      >
        <Chat
          filteredChat={filteredChat}
          idInstance={idInstance}
          apiTokenInstance={apiTokenInstance}
          setIdInstance={setIdInstance}
          setApiTokenInstance={setApiTokenInstance}
        />
      </div>
    </div>
  );
};

export default ChatPage;
