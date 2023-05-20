import { Dispatch, SetStateAction } from "react";

export interface ChatPageProps {
  idInstance: string;
  apiTokenInstance: string;
  setIdInstance: Dispatch<SetStateAction<string>>;
  setApiTokenInstance: Dispatch<SetStateAction<string>>;
}

export interface MessageI {
  text: string;
  id?: string;
  type?: string;
}

export interface ChatI {
  phoneNumber: string;
  messages: MessageI[];
}
