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

        function createToken(user: any){
            let token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 600})
            
            return {token: token}
            /*res.json({
                token: token
            })*/
        }

        /*router.post('/receiverlogin', async (req, res)=>{
            try {
                let p = await repo.receiverlogin(req.body);
                //ws.broadcast('Data changed');
                res.send(p);
            } catch(error){
                console.log('error in save');
            }
        })*/

        router.post('/senderlogin', async (req, res)=>{
            try {
                let p = await repo.senderlogin(req.body);
                ws.broadcast('Data changed');
                res.send(p);
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

        return router;
    }
}