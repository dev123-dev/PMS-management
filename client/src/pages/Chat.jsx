import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host,allUsersMsgCountRoute,updateChatViewRoute } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { w3cwebsocket } from "websocket";

export default function Chat() {
  // const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [contactsMsgCount, setContactsMsgCount] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(async () => {
    setCurrentUser(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )
    );
  }, []);
//SLAP IP
  const client = new w3cwebsocket("ws://192.168.6.128:8000");

  // useEffect(async() => {
    client.onopen = () => {
      console.log("webSocket client connected");
    };
    client.onmessage = async(message) => {
      if (currentUser) {
        if (currentUser.userName) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          console.log("data.data",data.data)
          setContacts(data.data);
        }
      }
    };
  // }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.userName) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
        const dataCount = await axios.get(`${allUsersMsgCountRoute}/${currentUser._id}`);
        setContactsMsgCount(dataCount.data);
      }
    }
  }, [currentUser]);

  useEffect(async() => {
    if (currentUser) {
      if (currentUser.userName) {
        if (socket.current) {
          socket.current.on("msg-recieve",async(data) => {
            const dataCount = await axios.get(`${allUsersMsgCountRoute}/${currentUser._id}`);
            setContactsMsgCount(dataCount.data);    
          });
        }
      }
    }
  }, [currentUser]);



  const handleChatChange =async (chat) => {
    setCurrentChat(chat);
    await axios.post(updateChatViewRoute, {
      chatUserId: chat._id,
      currentUserId:currentUser._id,
    });
    const dataCount = await axios.get(`${allUsersMsgCountRoute}/${currentUser._id}`);
    setContactsMsgCount(dataCount.data);    
    localStorage.setItem("curChat",JSON.stringify(chat));
  };
  return (
    <>
      <div className="chat_div">
        <Container>
          <label>Chat</label>

          <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} contactsMsgCount={contactsMsgCount} />
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat} socket={socket} />
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

const Container = styled.div`
  height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  background-color: #456792;
  color: #fff;

  animation: mymove 100ms;
  animation-fill-mode: forwards;

  @keyframes mymove {
    from {
      width: 0;
    }
    to {
      width: 400px;
    }
  }
  .container {
    height: 90%;
    width: 100%;
    padding-left: 0;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 26% 75%;
  }
  label {
    color: white;
  }
`;
