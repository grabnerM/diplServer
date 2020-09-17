import express from 'express';
import { SenderController } from './controller/sendercontroller';
import { ReceiverController } from './controller/receivercontroller';
var server = express();

server.use(express.json());

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

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