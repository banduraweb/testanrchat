import React from "react";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import socketIOClient from "socket.io-client";
import makeToast from "../Toaster";
const ChatroomPage = ({ toUserId, socket, userEmail, role }) => {


  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");


  const token = localStorage.getItem("CC_Token");
  const payload = JSON.parse(atob(token.split(".")[1]));

  const sendMessage = (e) => {
    const token = localStorage.getItem("CC_Token");
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (socket) {

      socket.emit("messageFromClient", {
        toUserId: toUserId,
        room:  payload.role === "admin" ? `${"support"}-${toUserId}` : `${"support"}-${payload.userId}`,
        personalRoom: payload.userId,
        msg: messageRef.current.value,
      });

      messageRef.current.value = "";
    }
  };
  React.useEffect(() => {

    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {

      socket.on("messageFromServer",  (message) => {
        console.log(message, 'newMessage');
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [socket, messages]);

  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (socket) {
      socket.emit("joinConversation", {
        room:  payload.role === "admin" ? `${"support"}-${toUserId}` : `${"support"}-${payload.userId}`,
        personalRoom: payload.userId,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveConversation", {
          room:  payload.role === "admin" ? `${"support"}-${toUserId}` : `${"support"}-${payload.userId}`,
          personalRoom: payload.userId,
        });
      }
    };
    //eslint-disable-next-line
  }, [socket]);
  console.log(messages, "messages");
  console.log(payload.userId, "payload.userId");
  console.log(toUserId, "userId");
  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="chatroomContent">
          {payload.role === "patient" ? messages.filter(msg=>
            (msg.from._id === payload.userId && msg.to._id === toUserId) ||
            (msg.to._id === payload.userId && msg.from._id === toUserId)
          ).map((message, i) => (
            <div key={i} className="message">
              <span
                className={
                  userId === message.from ? "ownMessage" : "otherMessage"
                }
              >
                {/*{message.name}:*/}
              </span>{" "}
              FROM:{message.from.fullName}
              <br/>
              TO:{message.to.fullName}
              <br/>
              TO:{message.to._id}
              <br/>
              {message.body}
            </div>
          )) : (
            <>
              { messages.filter(msg=>
                (msg.from._id === "602633b1c705df343087133d" && msg.to._id === toUserId) ||
                (msg.to._id === "602633b1c705df343087133d" && msg.from._id === toUserId)
              ).map((message, i) => (
                <div key={i} className="message">
              <span
                className={
                  userId === message.from ? "ownMessage" : "otherMessage"
                }
              >
                {/*{message.name}:*/}
              </span>{" "}
                  FROM:{message.from.fullName}
                  <br/>
                  TO:{message.to.fullName}
                  <br/>
                  TO:{message.to._id}
                  <br/>
                  {message.body}
                </div>
              ))}
            </>
          )
          }
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChatroomPage);
