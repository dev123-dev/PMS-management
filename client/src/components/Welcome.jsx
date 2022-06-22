import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).userName
    );
  }, []);
  return (
    <Container>
      <center>
        {/* <img src={Robot} alt="" /> */}
        <h3>
          Welcome, <span>{userName}!</span>
        </h3>
        <h4>Please select a chat to Start messaging.</h4>
      </center>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  background-color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
