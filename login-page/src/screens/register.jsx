import React, { useState } from 'react'
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require("axios")




export const Register = (props) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const notify = (msg) => toast(msg);

  const handleSubmit = (e) => {

    // app.post("localhost:8080/register", async (req, res) => {

    //   // Our login logic starts here
    //   try {
    //     const Credentials = {
    //       username: username,
    //     email: email,
    //     password: password
    //     }
    //       // user
    //       res.status(200).json(Credentials);
          
    //   } catch (err) {
    //     console.log(err);
    //   }
    //   // Our register logic ends here
    // });

    axios
      .post('http://localhost:8080/register', {
        username: username,
        email: email,
        password: password
      },
      )
      .then(function (result) {
        if (result.data.token) {
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('email', result.data.email)
          window.location = '/app'
        }
      }).catch (e => {
        if(e.toString() == "Error: Request failed with status code 409"){
          notify('Email already exist')
        }
        else if(e.toString() == "Error: Request failed with status code 400"){
          notify('All fields are mandatory')
        }
      console.log(e)
    })
  }

  return (
    <>
      <div style={{ margin: '10px' }}>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '0 0 110px', marginRight: '5px', userSelect: 'none' }}>
            <span>username</span>
          </div>
          <div style={{ display: 'flex', flex: '1' }}>
            <input name='username' type='text' value={username} onChange={(e) => { setUsername(e.target.value) }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '0 0 110px', marginRight: '5px', userSelect: 'none' }}>
            <span>email</span>
          </div>
          <div style={{ display: 'flex', flex: '1' }}>
            <input name='email' type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '0 0 110px', marginRight: '5px', userSelect: 'none' }}>
            <span>password</span>
          </div>
          <div style={{ display: 'flex', flex: '1' }}>
            <input name='password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '0 0 120px', marginRight: '5px', userSelect: 'none' }}>
            <button onClick={handleSubmit}>sign up</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '1', marginRight: '5px', userSelect: 'none' }}>
            or&nbsp;<Link style={{ color: 'blue' }} to={`/login`}>log in</Link>
          </div>
        </div>
        <ToastContainer />
      </div>

    </>
  )
}

export default Register;