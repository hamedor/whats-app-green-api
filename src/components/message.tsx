import { MessageI } from "../interfaces/interfaces";

interface MessageProps{
    message:MessageI
}

const Message = ({message}:MessageProps) => {


    return (
        <div
          key={message.id}
          style={{
            maxWidth: "70%",
            marginBottom: "1rem",
            position: "relative",
            borderRadius: "1rem",
            padding: "0.1rem 0.8rem",
            display: "flex",
            alignItems: "center",
            alignSelf: message.type === "received" ? "flex-start" : "flex-end",
            backgroundColor: message.type === "received" ? "#202c33" : "#176b5b",
            textAlign: message.type === "received" ? "left" : "right",
          }}
        >
          <p style={{ color: "#fff" }}>{message.text}</p>
          <div
            className={`${
              message.type === "received" ? "bubble-arrow" : "bubble-arrow-right"
            }`}
          ></div>
        </div>
    );
};



export default Message;