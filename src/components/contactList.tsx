import { ChatI } from "../interfaces/interfaces";
import UserInfo from "./userInfo";

interface ContactListProps {
  chats: ChatI[];
  setSelectedChat: (arg: string) => void;
  selectedChat: string;
}

const ContactList = ({
  chats,
  setSelectedChat,
  selectedChat,
}: ContactListProps) => {
  return (
    <div style={{ width: "100%", overflowY: "auto",}}>
      {chats.map((chat) => {
        return (
          <div
            className="hover"
            onClick={() => setSelectedChat(chat.phoneNumber)}
            key={chat.phoneNumber}
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "0.48rem",
              paddingLeft: "1rem",
              backgroundColor:
                chat.phoneNumber === selectedChat ? "#2a3942" : "unset",
            }}
          >
            <UserInfo chat={chat} />
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
