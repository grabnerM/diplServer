import express from 'express';
import { SenderController } from './controller/sendercontroller';
import { ReceiverController } from './controller/receivercontroller';
import { Controller } from './controller/controller';

var server = express();

require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const { ensureToken } = require('./middleware')
server.use(bodyParser.json())
server.use(cookieParser())


server.use(express.json());

server.use(function(req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

server.use('/sender', ensureToken, SenderController.handler());
server.use('/receiver', ensureToken, ReceiverController.handler());
server.use('/authenticate',  Controller.handler());

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


server.get('/api', ensureToken, function(req, res){
    res.send("Protected")
})

