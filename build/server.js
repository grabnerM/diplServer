"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sendercontroller_1 = require("./controller/sendercontroller");
var receivercontroller_1 = require("./controller/receivercontroller");
var server = express_1.default();
require('dotenv').config();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
//const {login, refresh} = require('./authentication')
var ensureToken = require('./middleware').ensureToken;
server.use(bodyParser.json());
server.use(cookieParser());
//server.post('/login', login)
//server.post('/refresh', refresh)
server.use(express_1.default.json());
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
server.use(function (req, res, next) {
    console.log('Time: ', new Date(Date.now()));
    next();
});
server.use('/sender', sendercontroller_1.SenderController.handler());
server.use('/receiver', receivercontroller_1.ReceiverController.handler());
server.get('/api/echo', function (req, res) {
    res.send('Hello Node');
});
server.get('/api/message', function (req, res) {
    res.send('Hello Message');
});
var port = 8080;
server.listen(port, function () {
    console.log('API is listening on port ' + port);
});
server.post('/api/login', function (req, res) {
    //Testweise User daten
    var user = { id: 3 };
    var token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS512",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });
    res.json({
        token: token
    });
});
server.get('/api', ensureToken, function (req, res) {
    res.send("Protected");
});
/*let users = {
    john: {password: "john"},
    mary: {password:"mary"}
}*/
/*exports.login = function(req: { body: { username: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (): any; new(): any; }; }; send: (arg0: string | undefined, arg1: undefined, arg2: { secure: boolean; httpOnly: boolean; } | undefined) => void; }){
    let username: keyof typeof users;

    username = req.body.username
    let password = req.body.password
    
    // Neither do this!
    if (!username || !password || users[username] !== password){
        return res.status(401).send()
    }
    
    let payload = {username: username}

    //create the access token with the shorter lifespan
    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    //create the refresh token with the longer lifespan
    /*let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE
    })

    //store the refresh token in the user array
    //users[username].refreshToken = refreshToken

    //send the access token to the client inside a cookie
    res.send("jwt", accessToken, {secure: true, httpOnly: true})
}*/
//const {verify} = require('./middleware')
//server.get('/api', verify)
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
