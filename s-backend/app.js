require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require('cors');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

const app = express();


app.use(cors({
  origin: 'https://localhost:3000'
}));
app.use(express.json());

const auth = require("./middleware/auth");
const MyUser = require("./model/user");

app.post("/app", async (req, res) => {
  try{
    const { email, token} = req.body;
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      //if(decoded){
        req.user = decoded;
      let user = await MyUser.findOne({ email });
      res.status(200).json(user)
      //}
    } catch (err) {
      console.log(err);
      return res.status(401).send("Invalid Token");
    }
  }
  catch(e){
    console.log(e);
  }

});

app.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { username, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && username)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await MyUser.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      //Create user in our database
      const user = await MyUser.create({
        username,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
    //   db.collection('user').insertOne({
    //     username,
    //     email: email.toLowerCase(), // sanitize: convert email to lowercase
    //     password: encryptedPassword,
    //   }, (err, data) => {
    //     if(err) return console.log(err);
    //     console.log('saved to db: ' , data);
    // })
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

  app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(420).send("All input is required");
      }
      // Validate if user exist in our database
      let user = await MyUser.findOne({ email });
      console.log(user);
      console.log(user.password);
      console.log(password);
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
        console.log(user.token);
        console.log(user);
        // user
        res.status(200).json(user);
      }
      else{
        res.status(400).send("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

module.exports = app;