"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sendercontroller_1 = require("./controller/sendercontroller");
var receivercontroller_1 = require("./controller/receivercontroller");
var server = express_1.default();
server.use(express_1.default.json());
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
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
console.log('helloWorld');
