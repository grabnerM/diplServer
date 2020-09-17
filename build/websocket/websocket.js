"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = __importStar(require("ws"));
var Websocket = /** @class */ (function () {
    // ------------------------- Singleton -------------------------
    function Websocket() {
        this.startws();
    }
    Websocket.getInstance = function () {
        if (!Websocket.instance) {
            Websocket.instance = new Websocket();
        }
        return Websocket.instance;
    };
    //start ws-Server
    Websocket.prototype.startws = function () {
        Websocket.wss = new WebSocket.Server({ port: 3000 });
        Websocket.wss.on('connection', function (ws) {
            ws.on('message', function (message) { return console.log('recieved: %s', message); });
            ws.send('Welcome');
        });
    };
    //send message to connected clients
    Websocket.prototype.broadcast = function (data) {
        Websocket.wss.clients.forEach(function (client) {
            if (client.readyState == WebSocket.OPEN)
                client.send(data);
        });
    };
    return Websocket;
}());
exports.Websocket = Websocket;
