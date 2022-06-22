import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  // const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(async () => {
    setCurrentUser(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )
    );
  }, []);
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
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    localStorage.setItem("curChat", JSON.stringify(chat));
  };
  return (
    <>
      <div className="chat_div">
        <Container>
          <label>Chat</label>

          <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} />
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
