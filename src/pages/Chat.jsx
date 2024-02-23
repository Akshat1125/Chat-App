import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../../Backend/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';


export default  function  Chat() {

  //constant data
  const navigate = useNavigate();
  const [contacts,setContacts] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const socket = useRef()
//middlewares to fetch

  const tokenFetch = ()=>{
    if (localStorage.getItem('chat-app-user')) {
        setCurrentUser( JSON.parse(localStorage.getItem("chat-app-user")));}
      else {
        navigate('/login');}
      }

  const getAPIData = useCallback ((iscancelled)=>{
    if(!iscancelled)
       if (currentUser) {
          if (currentUser.isAvatarImageSet) {
             axios.get(`${allUsersRoute}/${currentUser._id}`)
            .then(res=>setContacts(res.data))
            .catch(err=>
              console.log("error in the foeld",err)
              )
          }
        else
        navigate('/setAvatar')
        }
          },[currentUser])

          const handleChatChange =(chat)=>{
           setCurrentChat(chat);
          }

//use effect calls

  useEffect(()=>{
    tokenFetch();
    },[]);

    useEffect(()=>{
      if(currentUser){ socket.current= io(host)
      socket.current.emit("add-user",currentUser._id);
      }
    },[currentUser])


  useEffect( ()=>{
     let iscancelled = false;
      getAPIData(iscancelled);
      return ()=>{
        iscancelled=true;
      }
    },[getAPIData])

//function return data
  return (
    <Container>

    {(currentUser&&contacts)?
      <Contacts  handleChatChange={handleChatChange} contacts={contacts} currentUser={currentUser} />: <h2>Loading....</h2>
    }
    <div className="container">
      {(currentUser)?
      (!currentChat)?
    <Welcome currentUser={currentUser}/>:
    <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>: <h3>loading currentuser...</h3>
      }
    </div></Container>
  )
  }


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgb(242, 211, 189);
  .container{
    background-color: #e6c2c2c9;
    height: 85vh;
    width: 65vw;
    display: grid;
  }
`
