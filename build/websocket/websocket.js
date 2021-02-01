"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Websocket = void 0;
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
        Websocket.wss.on('connection', function (ws, req) {
            ws.on('message', function (message) { return console.log('received: %s', message); });
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
