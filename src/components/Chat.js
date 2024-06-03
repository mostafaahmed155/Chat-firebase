import React, { useContext } from "react";
import cam from "../img/cam.png"
import add from "../img/add.png"
import more from "../img/more.png"
import Masseges from "./Masseges";
import Input from "./Input"
import { ChatContext } from "../context/ChatContext";
const Chat = () => {
  const { data} = useContext(ChatContext)
  
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <Masseges/>
      <Input/>
    </div>
  );
};

export default Chat;
