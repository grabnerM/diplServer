import { RequestHandler, Router } from "express";
import { Repository } from "../repository/repository";
import { Websocket } from "../websocket/websocket";

/*
  Autor: Jakob Hocheneder
  Titel: Controller für die Authentifizierung
  Beschreibung: In diesem Controller werden alle Requests für Login und Register entegegengenommen.
*/
export class Controller {
    static handler(): RequestHandler{
        let router: Router = Router();
        const repo: Repository = new Repository();

        /**
         * Login für den Auftraggeber
         */
        router.post('/receiverlogin', async (req, res)=>{
            try {
                let p = await repo.receiverlogin(req.body);
                if(p.length>0){
                    let token = await repo.createAccessToken(p[0]);
                    res.send(token);
                } else{
                    res.send(false);
                }
                
            } catch(error){
                console.log('error in receiver login');
            }
        })

        /**
         * Login für den Kurier
         */
        router.post('/senderlogin', async (req, res)=>{
            try {
                let p = await repo.senderlogin(req.body);
                if(p.length>0){
                    let token = await repo.createAccessToken(p[0]);
                    res.send(token);
                } else{
                    res.send(false);
                }
                
            } catch(error){
                console.log('error in sender login'+error);
            }
        })

        /**
         * Register für den Kurier
         */
        router.post('/createSender', async (req, res)=>{
            try {
                let p = await repo.createSender(req.body);
                res.send(p);
            } catch(error){
                console.log('error in createSender');
            }
        });

        /**
         * Register für den Auftraggeber
         */
        router.post('/createReceiver', async (req, res)=>{
            try {
                let l = {email: req.body.email, password: req.body.password}
                console.log(l)
                let r = await repo.createReceiver(req.body);
                let p = await repo.receiverlogin(l);
                if(p.length>0){
                    let token = await repo.createAccessToken(p[0]);
                    res.send(token);
                } else{
                    res.send(false);
                }
            } catch(error){
                console.log('error in createReceiver' +error);
            }
        });

        return router;
    }
}