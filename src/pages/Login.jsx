import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/Logo.svg"
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css"
import { loginRoute } from '../../Backend/APIRoutes';

function Login() {
 const navigate = useNavigate();
  const[values,setValues] = useState({
    username:"",
    password:"",
  })

  const toastOption={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"light"
  }

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){navigate('/')}
  },[]);
  const handleSubmit = async(event)=>{
     event.preventDefault();
        if(handleValidation()){
    const {password,username}=values;
    const {data}=await axios.post(loginRoute,{
      username,password
    });
         if(data.status===false){
          toast.error(data.msg,toastOption);
         }
         if(data.status===true){
          localStorage.setItem('chat-app-user',JSON.stringify(data.user));
          navigate("/");
         }
        }
  }

  const handleValidation =()=>{
    const {password,username}=values;
    if(password===''||username===''){
      toast.error("username and password are required",toastOption);
      return false

    }

    return true
  }

  const handleChange =(event)=>{
    setValues({...values,[event.target.name]: event.target.value})
  }
  return (
    <>
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
               <div className="brand">
                <img src={Logo} alt="Logo" />
                <h1 style={{color:"#252524e8"}}>Chat</h1>
               </div>
               <input type="text" name="username" placeholder="Username" onChange={(e)=>handleChange(e)}
               min={3}/>

               <input type="password" name="password" placeholder="Password" onChange={(e)=>handleChange(e)} />

               <button type="submit">Login</button>
               <span>Don't have an account? <Link to ='/register'>Register</Link></span>

        </form>
    </FormContainer>
    <ToastContainer/>
    </>
  )
}


const FormContainer =styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap: 1rem;
background-color: rgb(243, 243, 247);
.brand{
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img{
    height:5rem;
  }
  h1{
    color:white;
    text-transform: uppercase;
  }
}
form{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #f4efefe9;
  border-radius: 2rem;
  padding: 3rem 5rem ;
  input{
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #5c5b5cdd;
    border-radius: 0.4rem;
    color: #252524e8;
    width: 100%;
    font-size: 1rem;
    &:focus{
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button{
    background-color: #0a89f1ec;
    color: #f5edede0;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0%.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out ;
    &:hover{
      background-color: #4e0eff;
    }
  }
  span{
    color: #6e6c6cf3;
    text-transform: uppercase;
    a{
      color: #4e0eff99;
      text-decoration: none;
      font-weight: bold;
    }
  }
}

`;


export default Login;