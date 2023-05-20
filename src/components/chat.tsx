import { useState } from "react";
import request from "../functions/request";
import Form from "./form";
import UserInfo from "./userInfo";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import { ChatI, ChatPageProps } from "../interfaces/interfaces";
import { MessageI } from "../interfaces/interfaces";
import Message from './message'

interface ChatProps extends ChatPageProps {
  filteredChat: ChatI[];
}

const Chat = ({
  filteredChat,
  idInstance,
  apiTokenInstance,
  setIdInstance,
  setApiTokenInstance,
}: ChatProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");

  const sendMessage = async () => {
    const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
    const body = {
      chatId: `${filteredChat[0].phoneNumber.toString()}@c.us`,
      message: message,
    };
    await request(url, "POST", "", body);
  };

  const logout = () => {
    setIdInstance("");
    setApiTokenInstance("");
    navigate("/");
  };

  return (
    <div
      className="background"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "70rem",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "1rem 1rem",
          height: "3rem",
          backgroundColor: "rgb(42, 57, 66)",
          alignItems: "center",
        }}
      >
        {filteredChat.length > 0 && (
          <UserInfo chat={filteredChat[0]} renderlastMessage={false} />
        )}
        <div style={{ marginLeft: "auto" }}>
          <Button onClick={logout} label={"выйти"} />
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", padding: "2rem" }}
      >
        {filteredChat[0]?.messages.map((message:MessageI) => {
        return <Message key={message.id} message={message} />;
        })}
      </div>

      <div style={{ marginTop: "auto" }}>
        <Form
          setValue={setMessage}
          name={"Введите сообщение"}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
