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
const getUid = require("./middleware/getUid");
const MyUser = require("./model/user");
const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('crypto');

const PassPhrase = "Top secret.";

const Bits = 1024;

const encryptWithRSA = (input, publickey) => {
    const buffer = Buffer.from(input, 'utf-8');
    const encrypted = publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
}

const decryptWithRSA = function (input, privatekey) {
    const buffer = Buffer.from(input, 'base64');
    const decrypted = privateDecrypt(
        {
            key: privatekey,
            passphrase: PassPhrase,
        },
        buffer,
    )
    return decrypted.toString("utf8");
};

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: Bits,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: PassPhrase
    }
});
app.post('/pkey', (req, res) => {
  res.status(200).json({ "publickey": publicKey});
})
app.post("/app",auth,getUid, async (req, res) => {
  try{
    //let user = await MyUser.findOne({ email });
    let secret = req.secret;
    let uid = req.uid;
    const user = await MyUser.findOne({ uid });
    console.log(user);
    if(user.secret == secret){
      res.status(200).json(user);
    }
    else{
      res.status(522).send("Invalid Session");
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
      var uid = await makeid(12);
      var secret  = await makeid(12);
      //Create user in our database
      const user = await MyUser.create({
        uid : uid,
        username: username,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        secret: secret,
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
        { uid: uid, secret: secret },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      const userToken = jwt.sign(
        { token: token },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = userToken;
      // return new user
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });
  async function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   const uid = await MyUser.findOne({ result });
   if(uid){
    makeid(12);
   }
   return result;
}
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
      if(!user){
        return res.status(509).send("Incorrect emaiL");
      }
      //var uid = makeid(12);
      //var secret = makeid(12);
      //console.log(uid);
      console.log(user.password);
      console.log(password);
      var secret  = await makeid(12);
      await MyUser.updateOne({ email:email },{$set:{secret:secret}});
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { uid: user.uid, secret: secret},
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // const newToken = jwt.sign(
        //   { token: token, secret },
        //   process.env.TOKEN_KEY,
        //   {
        //     expiresIn: "2h",
        //   }
        // )
        // save user token
        const userToken = jwt.sign(
          { token: token },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = userToken;
        console.log(user.token);
        console.log(user);
        // user
        res.status(200).json(user);
      }
      else{
        res.status(666).send("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

module.exports = app;