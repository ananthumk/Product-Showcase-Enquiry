import React, { useState } from 'react'
import { IoMdMenu, IoMdClose } from "react-icons/io";
import './Header.css'
import LoginPopup from '../Login/Login'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false)


  const navigate = useNavigate()

  return (
    <div className='header-container'>
      <h1 onClick={() => {navigate('/')}} className='header-text'>ProductHub</h1>
      <div className='navbar' style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        
        <p className='header-link' onClick={() => setShowLogin(true)}>Sign In</p>
      </div>

      {showLogin && <LoginPopup setLoginPopUp={setShowLogin} />}
    </div>
  )
}

export default Header
