import React ,{useState, memo}from 'react'
import styled from 'styled-components';
import Logo from '../assets/Logo.svg';


export default memo(function Contacts({handleChatChange,contacts,currentUser}) {


    const [currentSelected,setCurrentSelected]=useState(undefined);


    const changeCurrentChat=(index,contact)=>{
     setCurrentSelected(index);
     handleChatChange(contact);
    }



  return (
    <>
    { (
            <Container>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h3 style={{color:"red"}}>Chat</h3>
                </div>
                <div className="contacts">
                    {
                      (contacts)?
                        contacts.map((contact,index)=>{
                            return(
                                <div className={`contact ${index===currentSelected?"selected":""}`} key={index} onClick={()=>changeCurrentChat(index,contact)}>
                                    <div className="avatar">
                                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })
                        : <h2>Loading Contacts...</h2>
                    }
                </div>
                {(currentUser)?
                <div className="currentUser">
                <div className="avatar">
                                    <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar"/>
                                    </div>
                                    <div className="username">
                                        <h1>{currentUser.username}</h1>

                                    </div>
                </div>
                : <h2>Loading CurrentUser...</h2>
                }
            </Container>
        )
    }
    </>
  )
})

const Container = styled.div`
     display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #f3a9a9f0;
  width: 25vw;
  height: 85vh;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: black;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color:#f5edede0;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact{
      background-color: #f5eded4e;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      /* overflow: hidden; */
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username{
        h3 {
          color: black;
        }
      }
    }
    .selected {
      background-color: #f87777ef;
    }
  }

  .currentUser {
    background-color: #f5edede0;
    display: flex;
    justify-content: center;
    align-items: center;
    /* gap: 2rem; */
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: black;
        font-size:smaller
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      /* gap: 0.5rem; */
      .username {
        h2 {
          font-size: 1px;
        }
      }
    }
    @media screen and (max-width: 720px) {
      /* gap: 0.5px; */
      .username {
        h2 {
          font-size: 1px;
        }
      }
    }
  }
`;