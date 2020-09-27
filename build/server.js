"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sendercontroller_1 = require("./controller/sendercontroller");
var receivercontroller_1 = require("./controller/receivercontroller");
var controller_1 = require("./controller/controller");
var server = express_1.default();
require('dotenv').config();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var ensureToken = require('./middleware').ensureToken;
server.use(bodyParser.json());
server.use(cookieParser());
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
server.use('/sender', ensureToken, sendercontroller_1.SenderController.handler());
server.use('/receiver', ensureToken, receivercontroller_1.ReceiverController.handler());
server.use('/authenticate', controller_1.Controller.handler());
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
/*server.post('/api/login', function(req, res){
    //Testweise User daten
    let user = { id: 3 }

    let token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 300})
    res.json({
        token: token
    })
})*/
server.get('/api', ensureToken, function (req, res) {
    res.send("Protected");
});
