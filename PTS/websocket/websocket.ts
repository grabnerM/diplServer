import * as WebSocket from 'ws';

export class Websocket {

    private static instance: Websocket;
    private static wss: WebSocket.Server;

    // ------------------------- Singleton -------------------------
    private constructor() { 
        this.startws()
    }

    public static getInstance(): Websocket {
        if (!Websocket.instance) {
            Websocket.instance = new Websocket();
        }
        return Websocket.instance;
    }

    //start ws-Server
    private startws() {
        Websocket.wss = new WebSocket.Server({port: 3000});
        Websocket.wss.on('connection', ws => {
            ws.on('message', message => console.log('recieved: %s', message));
            ws.send('Welcome');
        });
    }

    //send message to connected clients
    public broadcast(data: string) {
        Websocket.wss.clients.forEach(client => {
            if (client.readyState == WebSocket.OPEN) client.send(data);
        });
    }


}