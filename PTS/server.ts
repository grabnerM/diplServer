import express from 'express';
import { SenderController } from './controller/sendercontroller';
import { ReceiverController } from './controller/receivercontroller';
import { Request, Response } from 'express'

var server = express();

require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const jwt = require('json-web-token')

const {login, refresh} = require('./authentication')
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/login', login)
app.post('/refrsh', refresh)

server.use(express.json());

server.use(function(req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


server.use((req: any, res: any, next: () => void) => {
    console.log('Time: ', new Date(Date.now()));
    next();
});


server.use('/sender', SenderController.handler());
server.use('/receiver', ReceiverController.handler());

server.get('/api/echo', (req: any, res: { send: (arg0: string) => void; }) =>{
    res.send('Hello Node');
});

server.get('/api/message', (req: any, res: { send: (arg0: string) => void; }) =>{
    res.send('Hello Message');
});

const port = 8080;

server.listen(port, function(){
    console.log('API is listening on port '+port);
});



let users = {
    john: {password: "john"},
    mary: {password:"mary"}
}

exports.login = function(req, res){

    let username = req.body.username
    let password = req.body.password
    
    // Neither do this!
    if (!username || !password || users[username] !== password){
        return res.status(401).send()
    }    
}


//console.log('helloWorld')

/*
function authenticateToken(req: Request, res: Response, next: () => void) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.body = user
      next() // pass the execution off to whatever request the client intended
    })

  }

  server.get('/getToken/:email', (req, res) =>{
    res.send(generateAccessToken(req.params.email))
});

function generateAccessToken(email:string) {
    // expires after half and hour (1800 seconds = 30 minutes)
    const payload = {
        "email": email
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 1800 });
}*/