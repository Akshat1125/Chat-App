import EmojiPicker from 'emoji-picker-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import Sendmsg from "../assets/send.png";
import Emojin from "../assets/Emoji.png";

export default function ChatInput({handleSendMsg}) {
   const [showEmojiPicker,setShowEmojiPicker]=useState(false);
   const [msg,setMsg]= useState("");

   const handleEmojiPicker =()=>{
    setShowEmojiPicker(!showEmojiPicker);
   }
   const handleEmojiClick = (event,emojiObject)=>{
    console.log(event.emoji)
    setMsg(prevmsg=>prevmsg+event.emoji);
   }

   const sendChat = (event)=>{
    event.preventDefault();
    if(msg.length>0){handleSendMsg(msg)
    setMsg("")
    }
   }

  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <img src={Emojin} alt="" onClick={handleEmojiPicker} />
                {
                    showEmojiPicker&&<EmojiPicker onEmojiClick={handleEmojiClick}/>
                }
            </div>
        </div>
        <form className='input-container' onSubmit={e=>sendChat(e)}>
            <input type="text" name="" id="" placeholder='type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)}/>

          <button className="send" type='submit'>

            <img src={Sendmsg} alt="" />
          </button>

        </form>
    </Container>
  )
}

const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items: center;

.emoji{
    position: relative;
    padding: 0.5rem;
    .EmojiPickerReact {
        position: absolute;
        top: -450px;
        width: 12rem;
        height: 22rem;
    }
    img{
        width: 2rem;
        height:2rem;
        cursor: pointer;
    }
}

.input-container{
    display: grid;
    border-radius: 20%;
    grid-template-columns: 90% 10%;
    input{
        font-size: 1rem;

        border-radius: 2rem;
    }
    ::placeholder{
        text-align: center;
        font-size: 1rem;
    }

    .send{
        border-radius: 21rem;
        display: grid;
        place-items: center;
        background-color: #f87777ef;
    }
    img{
        width: 2rem;
        height:2rem;
    }
}
`
