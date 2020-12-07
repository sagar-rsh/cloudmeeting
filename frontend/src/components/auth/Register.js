import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';


import './style.css';

const Register = ({setAlert, register, isAuthenticated}) => {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
  });

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    register({name, email, password});
  }

  if(isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className="login-body">
        <img src="https://s3.amazonaws.com/discors-dev/Login/background.jpg" alt="" className="background-image"></img>
        {/* <img src="https://s3.amazonaws.com/discors-dev/Login/discors.svg" alt="" className="login-logo"></img> */}

        <form className="login-form" onSubmit={e => onSubmit(e)} >
          <div className="login-form-inner">
            <h3 className="form-header">Create an account</h3>
            <div className="form-input">
              <div className="email-container">
                <h5 className="email-label">EMAIL</h5>
                <input 
                  type="email"
                  name="email"
                  value = {email}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div>
                <h5 className="name-label">NAME</h5>
                <input 
                  type="text"
                  name="name"
                  value = {name}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <div>
                <h5 className="password-label">PASSWORD</h5>
                <input 
                  type="password"
                  name="password"
                  // minLength= '6'
                  value = {password}
                  onChange={e => onChange(e)}
                />
              </div>
              <input type="submit" className="submit" value="Register" />
              <div className="need-account">
                <Link to="/login">Already have an account?</Link>
              </div>
            </div>
          </div>
        </form>
    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
