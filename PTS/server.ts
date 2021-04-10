import express from 'express';
import { SenderController } from './controller/sendercontroller';
import { ReceiverController } from './controller/receivercontroller';
import { Controller } from './controller/controller';

//Implementierung von Express
var server = express();

//Implementierung von Cors um keine Cors policy errors zu bekommen
var cors = require('cors')
server.use(cors())

require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const { ensureToken } = require('./middleware')
server.use(bodyParser.json())
server.use(cookieParser())


server.use(express.json());

//Weiterleitung zum Sender Controller über den Pfad /sender. Mittels ensureToken wird sichergestellt das der JWT gültig ist
server.use('/sender', ensureToken, SenderController.handler());

//Weiterleitung zum Receiver Controller über den Pfad /receiver. Mittels ensureToken wird sichergestellt das der JWT gültig ist
server.use('/receiver', ensureToken, ReceiverController.handler());

//Weiterleitung zum Controller, welcher für die Authentifizierung nötig ist.
server.use('/authenticate',  Controller.handler());

/**
 * Funktion zum sicherstellen der Funktionalität des Servers
 */
server.get('/api/echo', (req: any, res: { send: (arg0: string) => void; }) =>{
    res.send('Hello Node');
});

const port = 8080;


server.listen(port, function(){
    console.log('API is listening on port '+port);
});

/**
 * Funktion zum testen der ensureToken Funktion
 */
server.get('/api', ensureToken, function(req, res){
    res.send("Protected")
})

