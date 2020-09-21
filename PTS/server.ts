import express from 'express';
import { SenderController } from './controller/sendercontroller';
import { ReceiverController } from './controller/receivercontroller';
import { Request, Response } from 'express'

require('dotenv').config()
process.env.TOKEN_SECRET;

const serveIndex = require('serve-index');
var server = express();
const jwt = require("jsonwebtoken");

server.use(express.json());

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});



server.get('/authenticateToken', (req: Request, res: Response, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.body = user
      next() // pass the execution off to whatever request the client intended
    })

  })

server.use((req, res, next) => {
    console.log('Time: ', new Date(Date.now()));
    next();
});

server.get('/getToken/:email', (req, res) =>{
    res.send(generateAccessToken(req.params.email))
});

function generateAccessToken(email:string) {
    // expires after half and hour (1800 seconds = 30 minutes)
    const payload = {
        "email": email
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 10 });
}

server.use('/sender', SenderController.handler());
server.use('/receiver', ReceiverController.handler());

server.get('/api/echo', (req, res) =>{
    res.send('Hello Node');
});

server.get('/api/message', (req, res) =>{
    res.send('Hello Message');
});

const port = 8080;

server.listen(port, function(){
    console.log('API is listening on port '+port);
});

console.log('helloWorld')
