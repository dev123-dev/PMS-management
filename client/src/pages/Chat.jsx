import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Draggable from "react-draggable";

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
  };
  return (
    <>
      <Draggable>
        <div className="container container_align ">
          <section className="sub_reg">
            <div
              className="row col-lg-12 col-md-12 col-sm-12 col-12 pt-3"
              style={{ height: "70%" }}
            >
              <Container>
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
          </section>
        </div>
      </Draggable>
    </>
  );
}

const Container = styled.div`
  height: 65vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 65vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
