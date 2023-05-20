import { useEffect, useState } from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import ChatPage from "./pages/chatPage";

function App() {
  
  const [idInstance, setIdInstance] = useState<string>("");
  const [apiTokenInstance, setApiTokenInstance] = useState<string>("");

  useEffect(()=>{
    console.log(idInstance)
    console.log(apiTokenInstance)
  },[idInstance, apiTokenInstance])

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                idInstance={idInstance}
                apiTokenInstance={apiTokenInstance}
                setIdInstance={setIdInstance}
                setApiTokenInstance={setApiTokenInstance}
              />
            }
          />

          <Route
            path="/chat"
            element={
              <ChatPage
                idInstance={idInstance}
                apiTokenInstance={apiTokenInstance}
                setIdInstance={setIdInstance}
                setApiTokenInstance={setApiTokenInstance}
              />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

//api token  26f365a34e9845dc91cd5188935e6bf97c08451314b142d592

//id 1101821244

//79126878918
