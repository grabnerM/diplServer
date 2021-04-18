import * as WebSocket from 'ws';

export class Websocket {

    private static instance: Websocket;
    private static wss: WebSocket.Server;

    
    private constructor() { 
        this.startws()
    }

    public static getInstance(): Websocket {
        if (!Websocket.instance) {
            Websocket.instance = new Websocket();
        }
        return Websocket.instance;
    }

    
    private startws() {
        Websocket.wss = new WebSocket.Server({port: 3000});
        Websocket.wss.on('connection', (ws, req) => {
            ws.on('message', message => console.log('received: %s', message));
            ws.send('Welcome');
        });
    }

    
    public broadcast(data: string) {
        Websocket.wss.clients.forEach(client => {
            if (client.readyState == WebSocket.OPEN) client.send(data);
        });
    }


}