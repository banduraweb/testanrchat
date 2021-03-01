import React, {useEffect, useState} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import IndexPage from "./Pages/IndexPage";
import ChatroomPage from "./Pages/ChatroomPage";
import io from "socket.io-client";
import socketIOClient from "socket.io-client";
import makeToast from "./Toaster";

function App() {
  const [socket, setSocket] = React.useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  // const [connectionId, setConnectionId] = useState(null);
   const [socketId, setSocketId] = React.useState(null);
   const [role, setRome] = React.useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");

    if (token && !socket) {

      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log(payload);
      setRome(payload)
      const newSocket = socketIOClient("http://3.140.211.197", { //  http://3.140.211.197
        query: {
          token: token,
          // room: `${conversationId}-${payload.userId}`
        },
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd"
        },
        // allowEIO3: true,
      });
      // socket.on("messages", (data) => setLastMessage(data));


      // const newSocket = io("http://localhost:3002", {
      //   query: {
      //     token: localStorage.getItem("CC_Token"),
      //   },
      // });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
         makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        // socket.on("connect", () => {
        // console.log(socket.id, "soclkid"); // ojIckSD2jqNzOqIrAGzL
        // });
        // setConnectionId()
        setSocketId(newSocket.id);
        // console.log(newSocket.id, 'sid');
         makeToast("Socket success");
      });

      setSocket(newSocket);
    }
  };
  // console.log(socketId);
  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);
  return (
    <>
    <h1>{role?.role}</h1>
    <h1>{role?.fullName}</h1>
    <h1>{role?.email}</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={IndexPage} exact />
          <Route
            path="/login"
            render={() => <LoginPage  />}
            exact
          />
          <Route path="/register" component={RegisterPage} exact />
          <Route
            path="/dashboard"
            render={() => <DashboardPage socket={socket} />}
            exact
          />
          <Route
            path="/chatroom/:id"
            render={() => <ChatroomPage socket={socket} socketId={socketId} />}
            exact
          />
        </Switch>
      </BrowserRouter>
      </>

  );
}

export default App;

{/*<BrowserRouter>*/}
{/*  <Switch>*/}
{/*    <Route path="/" component={IndexPage} exact />*/}
{/*    <Route*/}
{/*      path="/login"*/}
{/*      render={() => <LoginPage setupSocket={setupSocket} />}*/}
{/*      exact*/}
{/*    />*/}
{/*    <Route path="/register" component={RegisterPage} exact />*/}
{/*    <Route*/}
{/*      path="/dashboard"*/}
{/*      render={() => <DashboardPage socket={socket} />}*/}
{/*      exact*/}
{/*    />*/}
{/*    <Route*/}
{/*      path="/chatroom/:id"*/}
{/*      render={() => <ChatroomPage socket={socket} />}*/}
{/*      exact*/}
{/*    />*/}
{/*  </Switch>*/}
{/*</BrowserRouter>*/}
