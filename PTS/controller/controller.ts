import { RequestHandler, Router } from "express";
import { Repository } from "../repository/repository";
import { ReceiverController  } from "./receivercontroller";
import { SenderController } from "./sendercontroller";
import { Websocket } from "../websocket/websocket";

export class Controller {
    static handler(): RequestHandler{
        let router: Router = Router();
        const repo: Repository = new Repository();
        const ws: Websocket = Websocket.getInstance();

        router.post('/receiverlogin', async (req, res)=>{
            try {
                let p = await repo.receiverlogin(req.body);
                if(p.length>0){
                    let t = await repo.createToken(p[0]);
                    ws.broadcast('Data changed');
                    res.json({user: p[0], token: t});
                } else{
                    res.send(false);
                }
                
            } catch(error){
                console.log('error in senderlogin');
            }
        })

        router.post('/senderlogin', async (req, res)=>{
            try {
                let p = await repo.senderlogin(req.body);
                if(p.length>0){
                    let t = await repo.createToken(p[0]);
                    ws.broadcast('Data changed');
                    res.json({user: p[0], token: t});
                } else{
                    res.send(false);
                }
                
            } catch(error){
                console.log('error in senderlogin');
            }
        })

        router.post('/createSender', async (req, res)=>{
            try {
                let p = await repo.createSender(req.body);
                ws.broadcast('Data changed');
                res.send(p);
            } catch(error){
                console.log('error in createSender');
            }
        });

        router.post('/createReceiver', async (req, res)=>{
            try {
                let p = await repo.createReceiver(req.body);
                ws.broadcast('Data changed');
                res.send(p);
            } catch(error){
                console.log('error in createReceiver');
            }
        });

        return router;
    }
}