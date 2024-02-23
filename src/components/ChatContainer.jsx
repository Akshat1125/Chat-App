import React,{ useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Logout from './logout.jpg'
import { getAllMessagesRoute } from '../../Backend/APIRoutes'
import { useNavigate } from 'react-router-dom'
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { sendMessagesRoute } from '../../Backend/APIRoutes';
sendMessagesRoute

export default function ChatContainer({currentChat,currentUser,socket}) {


  const [messages,setMessages]=useState([]);
  const [arrivalmsgs,setArrivalMsgs]=useState(null);

  //  handleSendMsg(messages)

    const fetchMessages = useCallback(async()=>{
     const response= await axios.post(getAllMessagesRoute,{
        from:currentUser._id,
        to:currentChat._id,
      })
      setMessages(response.data)
    },[currentChat])
    useEffect(()=>{
      let iscancelled=false;
      fetchMessages(iscancelled);
      return(()=>{iscancelled=true;})
    },[fetchMessages])




    const navigate = useNavigate();
    const handleClick = ()=>{
        localStorage.clear();
        navigate('/login');
    }
    const handleSendMsg = async(msg)=>{
      socket.current.emit("send-msg",{
        to:currentChat._id,
        from:currentUser._id,
        message:msg,
       });

     await axios.post(sendMessagesRoute,{
      from:currentUser._id,
      to:currentChat._id,
      message:msg,
     });


     const msgs =[...messages];
     msgs.push({fromSelf:true,message:msg})
     setMessages(msgs)

    };

    useEffect(()=>{
      if(socket.current){
        socket.current.on("msg-receive",(msg)=>{
          setArrivalMsgs({fromSelf:false,message:msg});
        })
      }
    },[]);

    useEffect(()=>{arrivalmsgs&& setMessages((prev)=>[...prev,arrivalmsgs])},[arrivalmsgs])

  return (
    <Container>
        <div className="chat-header">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar"/>
                        <h3>{currentChat.username}</h3>
                        <div className="logout">
                        <img src={Logout} onClick={handleClick}></img>
                        </div>

        </div>
        {/* <Messages currentChat={currentChat} currentUser={currentUser} socket={socket} handleSendMsg={handleSendMsg}/>
         */}
         <div className='Msgcontainer'>
    {(messages)?
    <div className="msg" >{messages.map((msg)=>{
      return (
        <div key={uuidv4()} className={` ${
          msg.fromSelf ? "sended" : "recieved"
        }`}>
          <div className="content">
          {msg.message}
          </div>
        </div>
      )
    })

    }</div>:
    <div>Messages</div>
    }
    </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </Container>
  )
}

const Container = styled.div`
display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  .chat-header {
    display: flex;
    flex-direction: row;
    position: relative;
    /* background-color: black; */
    align-items: center;
    padding: 0 2rem;
    border-bottom: 1px solid black;
    img{
        width: 3rem;
        height:3rem;
    }
    h3{
        text-align: center;
        padding-left: 2rem;
    }
    .logout{
        position: absolute;
        background-color: #f87777ef;
        right: 8%;
        width: 2rem;
            border-radius: 32%;
            margin: auto;
            display: grid;
            place-content: center;
        height:2rem;
        img{
            width: 1rem;
            border-radius: 1px;
        height:1rem;
        }
    }
  }
  .Msgcontainer{
    padding: 1rem 2rem;
    display: flex;

    .msg {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      max-height: 65vh;

      width: 100%;
      &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        margin: 2px;
        padding: 1.5rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        background-color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      display: flex;
      justify-content:flex-end;
      .content {
        background-color: #f1492f20;
      }
    }
    .recieved {
      display: flex;
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`
