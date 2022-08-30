import React, { useState } from 'react'
import {Link } from 'react-router-dom';
import { Register } from './register'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require("axios")



export const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const notify = (msg) => toast(msg);
  const handleSubmit = (e) => {
      axios
      .post('http://localhost:8080/login', {
        email: email,
        password: password
      })
      .then(function (result) {
       if (result.data.token) {
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('email', result.data.email)
          window.location = '/app'
        }
      }).catch (e => {
        if(e.toString() == "Error: Request failed with status code 400"){
          notify('Incorrect email or password')
        }
        else if(e.toString() == "Error: Request failed with status code 420"){
          notify('All fields are mandatory')
        }
      console.log(e)
    })
  }

  // const reg = (e) => {
  //   //window.location = '/register'
  //   return (
  //       <BrowserRouter>
  //         <Routes>
  //             <Route path="register" element={<Register />} />
  //         </Routes>
  //       </BrowserRouter>
  //   )
  // } 

  return (
    <>
      <div style={{ margin: '10px' }}>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '0 0 110px', marginRight: '5px', userSelect: 'none' }}>
            <span>email</span>
          </div>
          <div style={{ display: 'flex', flex: '1' }}>
            <input name='email' type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
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
          <div style={{ display: 'flex', flex: '1', marginRight: '5px', userSelect: 'none' }}>
            <button onClick={handleSubmit}>sign in</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flex: '1', marginRight: '5px', userSelect: 'none' }}>
            or&nbsp;<Link style={{ color: 'blue' }} to={`/register`}>Register</Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default Login;
