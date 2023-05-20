import Input from "../components/input";
import { useNavigate } from "react-router-dom";
import request from "../functions/request";
import Button from "../components/button";
import { ChatPageProps } from "../interfaces/interfaces";

const Login = ({
  setIdInstance,
  setApiTokenInstance,
  idInstance,
  apiTokenInstance,
}: ChatPageProps) => {
  const navigate = useNavigate();

  const login = async () => {
    try {
      const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;
      const data = await request(url, "GET");

      if (
        data !== "NetworkError when attempting to fetch resource." &&
        data !== "401"
      ) {
        console.log(apiTokenInstance)
        navigate("/chat");
      } else {
        console.log(apiTokenInstance)
        alert("токены не валидны");
      }
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2 style={{ color: "#fff" }}>Войдите в систему</h2>
      <div style={{ display: "flex", margin: "2rem auto", width: "40rem" }}>
        <div style={{ width: "100%" }}>
          <Input setValue={setIdInstance} name="idInstance" />
          <Input setValue={setApiTokenInstance} name="apiTokenInstance" />
        </div>
        <Button onClick={login} label={"Вход"} />
      </div>
    </div>
  );
};

export default Login;
