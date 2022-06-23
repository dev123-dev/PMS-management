import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";

// import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat, contactsMsgCount }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.userName);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const contactFilterOpt = [];
  contacts.map((contact) =>
    contactFilterOpt.push({
      label: contact.userName,
      value: contact._id,
      
    })
  );
  const [contact, getcontact] = useState();
  const changeCurrentChatSearch = (e) => {
    changeChat({id:e.value,userName:e.label});
  }

  return (
    <>
      {currentUserName && currentUserName && (
        <Container>
          <div className="contactFilterStyle">
            <Select
              name="contactFilterData"
              options={contactFilterOpt}
              value={contact}
              isSearchable={true}
              placeholder="Select"
              onChange={(e) => changeCurrentChatSearch(e)}
            />
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              let msgCntVal = "";
              contactsMsgCount.map((contactsMsgCnt) => {
                if (contactsMsgCnt._id === contact._id) {
                  msgCntVal = contactsMsgCnt.msgCnt;
                }
                return <></>;
              });
              return (
                <>
                {msgCntVal ? (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  {/* <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div> */}
                  <a href="#" class="notification">
                    <span>{contact.userName}</span>
                    {msgCntVal > 0 && <span class="badge">{msgCntVal}</span>}
                  </a>
                </div>
                ):(<></>)}
                </>
              );
            })}
          </div>
          <div className="current-user">
            {/* <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div> */}
            <div className="username">
              <h4>{currentUserName}</h4>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  background-color: #25374e;
  padding-top: 10px;
  .contactFilterStyle {
    color: #000;
  }

  .contacts {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      min-height: 1.1rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.9rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        label {
          color: white;
          cursor: pointer;
          font-size: 14px;
        }
      }
    }
    // .selected {
    //   background-color: #456792;
    // }
  }

  .current-user {
    background-color: #456792;
    display: flex;
    justify-content: center;
    align-items: center;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
  }
`;
