import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import Notifier from "react-desktop-notification"

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        if (Notification.permission === "granted") {
          showNotification();
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              showNotification();
            }
          });
        }
        let curChatVal = JSON.parse(
          localStorage.getItem("curChat")
        );        
        if(curChatVal._id===data.from){
          setArrivalMessage({ fromSelf: false, message: data.msg });
        }
      });
    }
  }, []);

  function showNotification(data) {
    // const notification = new Notification("New Message " , {
    //   body: "Hey, You got A New Message",
    //   icon: "logo192.png",
    // });
    // const notification =
     new Notifier.start("New Message is Here","Hey, You got A New Message","","logo192.png");
    // notification.onclick = (e) => {
    //   window.location.href = "https://www.google.com";
    // };
  }

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            {/* <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            /> */}
          </div>
          <div className="username">
            <h4>{currentChat.userName}</h4>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()} className="chat-box-space">
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;

  .chat-box-space {
    margin-top: -1px;
    margin-bottom: -5px;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    .user-details {
      display: flex;
      align-items: left;

      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    background-color: #fff;
    padding: 5px 5px;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 80%;
        overflow-wrap: break-word;
        padding: 5px;
        font-size: 1.1rem;
        border-radius: 5px;
        color: #fff;
      }
      .content p {
        font-size: 16px;
        margin-bottom: 0em;
        line-height: 1.2rem;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f5b6b;
        text-align: right;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        text-align: left;
        background-color: #456792;
      }
    }
  }
`;
