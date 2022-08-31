import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const buildHeaders = () => {
    let token = localStorage.getItem("token")
    
    if (!token && token == "") {
      window.location = '/login'
    }else{
      axios.post("http://localhost:8080/app",
      {
        token : token
      }).then(res => {
        var id = document.getElementById("response");
        var eid = document.getElementById("email");
        var uid = document.getElementById("uid");
        var pass = document.getElementById("password");
        var sid = document.getElementById("secret");
        id.innerText = "Welcome "+res.data.username;
        eid.innerText = res.data.email;
        uid.innerText = res.data.uid;
        pass.innerText = res.data.password;
        sid.innerText = res.data.secret;
      }).catch (err => {
        window.location = '/login'
      })
      console.log(token);
    }
  }
  buildHeaders();
  const forcelogout = () => {
    let token = localStorage.setItem("token","")
      window.location = '/login'
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography id="response" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <Button onClick={forcelogout} color="inherit">LogOut</Button>
        </Toolbar>
      </AppBar>
      <div>
      <h3>Email:</h3><p id = "email"></p>
      <h3>UID:</h3>
      <p id="uid"></p>
      <h3>Password:</h3>
      <p id="password"></p>
      <h3>Secret:</h3>
      <p id="secret"></p>
      </div>
    </Box>
    // <>
    // <div className="App">
    //   <div style={{ marginBottom: '50px' }}>
    //   <div style={{ display: 'flex', flex: '1', marginRight: '5px', userSelect: 'none' }}>
    //     <button onClick={forcelogout}>LogOut</button>
    //     </div>
    //   </div>
    //   <p id='response'></p>
    // </div>
    // </>
  );
}

export default App

