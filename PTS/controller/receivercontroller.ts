import { RequestHandler, Router } from "express";
import { Repository } from "../repository/repository"
import { Websocket } from "../websocket/websocket";

const jwt = require('jsonwebtoken')
require('dotenv').config()

export class ReceiverController {
    static handler(): RequestHandler{
        let router: Router = Router();
        

        const repo: Repository = new Repository();
        const ws: Websocket = Websocket.getInstance();

        router.get('/echo', (req,res)=> {
            res.send('Hello NodeJS')
        });

        router.get('/getUser', (req,res)=> {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            let payload
            try{
                payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            }
            catch(e){
                console.log("token expired or invalid")
            }
            res.json(payload.user)
        });

        router.get('/getAllPositions/:id', async (req, res)=>{
            try {
                let p = await repo.getAllPositions(req.params.id);
                ws.broadcast('Data changed');
                res.send(p);
            } catch(error){
                console.log('error in getAllRoutes');
            }
        })

        router.get('/getRouteById/:id', async (req, res)=>{
            try {
                let p = await repo.getRouteById(req.params.id);
                ws.broadcast('Data changed');
                res.send(p)
            } catch (ex) {
                console.log("error in getRouteById controller")
            }
        })

        router.get('/findOldRoutes/:id', async (req,res)=>{
            try {
                let p = await repo.findOldRoutesByReceiver(req.params.id)
                ws.broadcast('Data changed');
                res.send(p)
            } catch (ex) {
                console.log("error in findOldRoutes receivercontroller")
            }
        })

        router.get('/findMostDrivingSender/:id', async (req, res)=>{
            try {
                let p = await repo.findMostDrivingSender(req.params.id)
                ws.broadcast('Data changed');
                res.send(p)
            } catch (ex) {
                console.log("error in findMostDrivingSender controller")
            }
        })

        router.get('/findAllRoutesByUser/:id', async (req, res)=>{
            try {
                let p = await repo.findAllRoutesByUser(req.params.id)
                ws.broadcast('Data changed');
                res.send(p)
            } catch (error) {
                console.log("error in findAllRoutesByUser controller")
            }
        })

        return router;
    }
}