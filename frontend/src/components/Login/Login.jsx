import React, { useState, useContext } from 'react'
import './Login.css'

import AppContext from '../../context/AppContext'
import axios from 'axios'

const LoginPopup = ({ setLoginPopUp }) => {
    const [currentState, setCurrentState] = useState('Sign up')
    const [errMsg, setErrMsg] = useState('')
    const [checkboxChecked, setCheckboxChecked] = useState(false)

    const appCtx = useContext(AppContext) || {}
    const url = appCtx.url || ''
    const setToken = typeof appCtx.setToken === 'function' ? appCtx.setToken : null

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChangeData = (e) => {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }))
    }

    const onSubmithandler = async (e) => {
        e.preventDefault()
        let newUrl = url
        if (currentState === 'Login') {
            newUrl += '/api/user/login'
        } else {
            newUrl += '/api/user/register'
        }
        try {
            const response = await axios.post(newUrl, data)
            if (response.data.success) {
                localStorage.setItem('token', response.data.token)
                if (setToken) setToken(response.data.token)
                setLoginPopUp(false)
                setErrMsg('')
            } else {
                setErrMsg(response.data.message)
            }
        } catch (error) {
            setErrMsg(error.response?.data?.message || "Something went wrong. Please try again.")
        }
    }

    return (
        <div className='login-popup'>
            <div className="login-popup-content">

                <div className='login-popup-title'>
                    <h2>{currentState}</h2>
                    <button className="close-btn" onClick={() => setLoginPopUp(false)}>×</button>
                </div>
                <form onSubmit={onSubmithandler} className="login-popup-inputs">
                    {currentState === 'Sign up' && <input onChange={onChangeData} name="name" value={data.name} type="text" placeholder='your name' required />}
                    <input onChange={onChangeData} name='email' value={data.email} type="email" placeholder='Your email' required />
                    <input onChange={onChangeData} name='password' value={data.password} type="password" placeholder='password' required />
                    <button type="submit" disabled={!checkboxChecked}>
                        {currentState === 'Sign up' ? 'Create Account' : 'Login'}
                    </button>
                    {errMsg && <p style={{ color: 'red', fontSize: '15px', textAlign: 'center', position: 'relative' }}>{errMsg}</p>}
                </form>
                <div className="login-popup-bottom">
                    <input
                        type="checkbox"
                        checked={checkboxChecked}
                        onChange={e => setCheckboxChecked(e.target.checked)}
                        id="terms"
                    />
                    <label htmlFor="terms">By continuing, you agree with company terms and agreement</label>
                </div>
                <div className="login-popup-last">
                    {currentState === 'Sign up' ?
                        <p>Already have an account?<span onClick={() => {setCurrentState('Login') 
                            setErrMsg('')
                        }}> Login</span></p> :
                        <p>Don't have an account?<span onClick={() => {setCurrentState('Sign up')
                            setErrMsg('')
                        }}> Click here</span></p>
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginPopup
