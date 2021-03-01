import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ChatroomPage from "./ChatroomPage";

const DashboardPage = ({socket}) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  const getChatrooms = () => {
    axios
      .get("http://3.140.211.197/api/v1/chat/get-chats-users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);
  console.log(chatrooms);
  return (
    <div >
      {/*<div className="cardHeader">Chatrooms</div>*/}
      {/*<div className="cardBody">*/}
      {/*  <div className="inputGroup">*/}
      {/*    <label htmlFor="chatroomName">Chatroom Name</label>*/}
      {/*    <input*/}
      {/*      type="text"*/}
      {/*      name="chatroomName"*/}
      {/*      id="chatroomName"*/}
      {/*      placeholder="ChatterBox Nepal"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <button>Create Chatroom</button>
      <div >
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} >
            <div>TO-></div>
            <div>{chatroom.fullName}</div>
            <div>{chatroom.role}</div>
            <div>{chatroom._id}</div>
            {/*<textaera>*/}
            {/*  */}
            {/*</textaera>*/}
            {/*<Link to={"/chatroom/" + chatroom._id}>*/}
            {/*  <div className="join">Join</div>*/}
            {/*</Link>*/}
            <ChatroomPage toUserId={chatroom._id} userEmail={chatroom.email} socket={socket}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
