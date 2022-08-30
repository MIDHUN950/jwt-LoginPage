import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  const buildHeaders = () => {
    let token = localStorage.getItem("token")
    let email = localStorage.getItem("email")
    
    if (!token && token == "") {
      window.location = '/login'
    }else{
      axios.post("http://localhost:8080/app",
      {
        email : email,
        token : token
      }).then(res => {
        var id = document.getElementById("response");
        id.innerText = "Welcome "+res.data.username;
      })
      console.log(token);
      console.log(email);
    }
  }
  buildHeaders();
  const forcelogout = () => {
    let token = localStorage.setItem("token","")
    let email = localStorage.setItem("email","")
      window.location = '/login'
  }
  return (
    <div className="App">
      <div style={{ marginBottom: '50px' }}>
      <div style={{ display: 'flex', flex: '1', marginRight: '5px', userSelect: 'none' }}>
        <button onClick={forcelogout}>LogOut</button>
        </div>
      </div>
      <p id='response'></p>
    </div>
  );
}

export default App

