import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom'

import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'

function App() {


  return (
    <>
      <Router>
      <Routes>
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/setAvatar' element={<SetAvatar/>} />

        <Route exact path='/' element={<Chat/>} />
      </Routes>

      </Router>
    </>
  )
}

export default App
