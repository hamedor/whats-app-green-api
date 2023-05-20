import { ChatI } from "../interfaces/interfaces";
import request from "./request";

interface MessageData {
  textMessageData?: {
    textMessage: string;
  };
  extendedTextMessageData?: {
    text: string;
  };
}

interface Body {
  typeWebhook?:
    | "incomingMessageReceived"
    | "outgoingMessageReceived"
    | "outgoingAPIMessageReceived";
  messageData?: MessageData;
  idMessage?: string;
  senderData?: {
    chatId: string;
  };
}

interface Data {
  body?: Body;
}

const createMessage = (data: Data) => {
  let text: string | undefined;
  let type: "received" | "sent" | undefined;

  if (
    data?.body?.typeWebhook === "incomingMessageReceived" ||
    data?.body?.typeWebhook === "outgoingMessageReceived"
  ) {
    text = data.body?.messageData?.textMessageData?.textMessage;
    if (data?.body?.typeWebhook === "incomingMessageReceived") {
      type = "received";
    } else {
      type = "sent";
    }
  } else if (data?.body?.typeWebhook === "outgoingAPIMessageReceived") {
    text = data.body?.messageData?.extendedTextMessageData?.text;
    type = "sent";
  }
  return {
    text: text || "",
    id: data?.body?.idMessage,
    type,
  };
};

const recieveNotification = async (
  setChats: (arg0: (prev: ChatI[]) => ChatI[]) => void,
  idInstance: string,
  apiTokenInstance: string
) => {
  const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;
  const deleteUrl = `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/`;

  const data: Data = await request(url, "GET", deleteUrl);

  if (data !== null) {
    console.log(data)
    if (
      data?.body?.typeWebhook === "incomingMessageReceived" ||
      data?.body?.typeWebhook === "outgoingMessageReceived" ||
      data?.body?.typeWebhook === "outgoingAPIMessageReceived"
    ) {
      const phoneNumber = data.body?.senderData?.chatId.split("@")[0];
      setChats((prev: ChatI[]): ChatI[] => {
        const chatIndex = prev.findIndex(
          (chat) => chat.phoneNumber === phoneNumber
        );
        if (chatIndex !== -1) {
          const updatedChats = [...prev];
          updatedChats[chatIndex] = {
            ...updatedChats[chatIndex],
            messages: [
              ...updatedChats[chatIndex].messages,
              createMessage(data),
            ],
          };
          return updatedChats;
        } else {
          return [
            ...prev,
            {
              phoneNumber: phoneNumber || "+7111111111",
              messages: [createMessage(data)],
            },
          ];
        }
      });
    }
    await recieveNotification(setChats, idInstance, apiTokenInstance);
  } else {
    setTimeout(
      async () =>
        await recieveNotification(setChats, idInstance, apiTokenInstance),
      5000
    );
  }
};

export default recieveNotification;
