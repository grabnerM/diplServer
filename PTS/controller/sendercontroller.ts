import { RequestHandler, Router } from "express";
import { Repository } from "../repository/repository";
import { Websocket } from "../websocket/websocket";

export class SenderController {
    static handler(): RequestHandler{
        let router: Router = Router();
        const repo: Repository = new Repository();
        const ws: Websocket = Websocket.getInstance();

        router.get('/echo', (req,res)=> {
            res.send('Hello NodeJS')
        });

        router.post('/save', async (req, res)=>{
            try {
                let p = await repo.save(req.body);
                ws.broadcast('Data changed');
                res.send(p);
            } catch(error){
                console.log('error in save');
            }
        })

        return router;
    }
}