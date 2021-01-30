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

        router.post('/savePosition', async (req, res)=>{
            try {
                let p = await repo.savePosition(req.body);
                ws.broadcast('Data changed');
                res.send(p);
            } catch(error){
                console.log('error in save pos');
            }
        });

        router.post('/startRoute/:id', async (req, res)=>{
            try {
                let p = await repo.startRoute(req.params.id);
                ws.broadcast('Data changed');
                res.send(p);
            } catch(error){
                console.log('error in new route');
            }
        });

        router.put('/endRoute/:id', async (req, res)=>{
            try {
                let p = await repo.endRoute(req.params.id);
                ws.broadcast('Data changed');
                res.send(p);
            } catch (error) {
                console.log('error in endRoute controller')
            }
        })

        router.get('/getOpenTasks/', async (req, res)=>{
            try {
                let p = await repo.getOpenTasks();

                res.send(p)
            } catch (ex){
                console.log('error in getOpenTasks controller '+ex)
            }
        })

        router.get('/acceptTask/:id', async (req, res) => {
            try {
                let p = await repo.acceptTask(repo.getSenderPayload(req.headers['authorization']), req.params.id)

                res.send(p)
            } catch (ex) {
                console.log('error in acceptTask controller '+ex)
            }
        })

        router.get('/getOpenTasksBySender/', async (req, res) => {
            try {
               let p = await repo.getOpenTasksBySender(repo.getSenderPayload(req.headers['authorization']));
               
               res.send(p)
            } catch (ex) {
                console.log('error in getOpenTasksBySender controller '+ex)
            }
        })

        return router;
    }
}