import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from './components/dashboard/firebase'

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((err) => alert(err.message))
    }
    return (
        <div className="login-body">
        <img src="http://bit.ly/2gPLxZ4" alt="" className="background-image"></img>
        {/* <img src="https://s3.amazonaws.com/discors-dev/Login/discors.svg" alt="" className="login-logo"></img> */}
        <form className="login-form" >
          <div className="login-form-inner">
            <h3 className="form-header">Welcome back!</h3>
            <h4 className="login-form-subtitle">We're so excited to see you again!</h4>
            <div className="form-input">
              <div className="email-container">
                <h5 className="email-label">EMAIL</h5>
                <input
                  type="email"
                  name="email"
                  value = ""
                  required
                />
              </div>
              <div>
                <h5 className="password-label">PASSWORD</h5>
                <input
                  type="password"
                  name="password"
                  minLength= '6'
                  value = ""
                />
              </div>
              <input type="submit" className="submit" value="Login"/>
              <div className="need-account">
                <span>Use Gmail</span>
                <Button onClick={signIn}>Sign In</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
}

export default Login