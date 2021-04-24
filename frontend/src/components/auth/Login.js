import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import './style.css';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
});

const { email, password } = formData;

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = e => {
  e.preventDefault();
  login(email, password);
}

// Redirect if Logged in
if(isAuthenticated) {
  return <Redirect to='/dashboard' />;
}


  return (
    <div className="login-body">
        <img src="http://bit.ly/2gPLxZ4" alt="" className="background-image"></img>
        {/* <img src="https://s3.amazonaws.com/discors-dev/Login/discors.svg" alt="" className="login-logo"></img> */}
        <form className="login-form" onSubmit={e => onSubmit(e)}>
          <div className="login-form-inner">
            <h3 className="form-header">Welcome back!</h3>
            <h4 className="login-form-subtitle">We're so excited to see you again!</h4>
            <div className="form-input">
              <div className="email-container">
                <h5 className="email-label">EMAIL</h5>
                <input
                  type="email"
                  name="email"
                  value = {email}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div>
                <h5 className="password-label">PASSWORD</h5>
                <input
                  type="password"
                  name="password"
                  minLength= '6'
                  value = {password}
                  onChange={e => onChange(e)}
                />
              </div>
              <input type="submit" className="submit" value="Login"/>
              <div className="need-account">
                <span>Need an account?</span>
                <Link to="/register" onClick="">Register</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
