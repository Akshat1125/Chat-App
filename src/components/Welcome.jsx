import React from 'react'
import styled from 'styled-components'
import Robo from "../assets/robo.gif";

export default function Welcome({currentUser}) {

  return (
    <Container>
      <img src={Robo} alt="robo" />
      <h1>Welcome {currentUser.username}</h1>
      <h3>please select a chat to start</h3>
    </Container>
  )
}

const Container = styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  h1 {
    color: #4e0eff;
  }
`
