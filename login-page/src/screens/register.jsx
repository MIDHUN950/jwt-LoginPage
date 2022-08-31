import React, { useState } from 'react'
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './login';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const axios = require("axios")
const bcrypt = require('bcryptjs');



const theme = createTheme();
export const Register = (props) => {
  
  
  //const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const notify = (msg) => toast(msg);
  
  const handleSubmit = async (e) => {
    //const salt = bcrypt.genSaltSync(10)

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
    //let encryptedPassword = await bcrypt.hash(password, salt);
    e.preventDefault();
  const data = new FormData(e.currentTarget);
  const username = data.get('firstName')+data.get('lastName')
    axios
      .post('http://localhost:8080/register', {
        username: username,
        email: data.get('email'),
      password: data.get('password'),
      },
      )
      .then(function (result) {
        if (result.data.token) {
          localStorage.setItem('token', result.data.token)
          window.location = '/app'
        }
      }).catch (e => {
        if(e.toString() == "Error: Request failed with status code 400"){
          notify('All fields are mandatory')
        }
        else if(e.toString() == "Error: Request failed with status code 409"){
          notify('Email already exist')
        }
      console.log(e)
    })
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link element={<Login/>} to={`/login`} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
      {/* <div style={{ margin: '10px' }}>

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
            or&nbsp;<Link element={<Login/>} to={`/login`}>log in</Link>
          </div>
        </div>
        <ToastContainer />
      </div> */}

    </>
  )
}

export default Register;