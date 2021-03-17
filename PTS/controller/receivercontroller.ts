import { RequestHandler, Router } from "express";
import { Repository } from "../repository/repository"
import { Websocket } from "../websocket/websocket";

const jwt = require('jsonwebtoken')
require('dotenv').config()

export class ReceiverController {
    static handler(): RequestHandler{
        let router: Router = Router();
        

        const repo: Repository = new Repository();

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

        router.get('/getUserId', (req,res)=> {
            let payload = 0
            try{
                payload = repo.getReceiverPayload(req.headers['authorization']);
                console.log(repo.getReceiverPayload(req.headers['authorization']));
            }
            catch(e){
                console.log("token expired or invalid")
            }
            res.json(payload)
        });

        router.get('/getAllPositions/', async (req, res)=>{
            try {
                let p = await repo.getAllPositions(repo.getReceiverPayload(req.headers['authorization']));
                res.send(p);
            } catch(error){
                console.log('error in getAllRoutes');
            }
        })

        router.get('/getRouteById/:id', async (req, res)=>{
            try {
                let p = await repo.getRouteById(req.params.id);
                res.send(p)
            } catch (ex) {
                console.log("error in getRouteById controller")
            }
        })

        router.get('/findOldRoutes/', async (req,res)=>{
            try {
                let p = await repo.findOldRoutesByReceiver(repo.getReceiverPayload(req.headers['authorization']))
                res.send(p)
            } catch (ex) {
                console.log("error in findOldRoutes receivercontroller")
            }
        })

        router.get('/findMostDrivingSender/', async (req, res)=>{
            try {
                let p// = await repo.findMostDrivingSender(repo.getReceiverPayload(req.headers['authorization']))
                res.send(p)
            } catch (ex) {
                console.log("error in findMostDrivingSender controller")
            }
        })

        router.get('/findAllRoutesByUser/', async (req, res)=>{
            try {
                let p = await repo.findAllRoutesByUser(repo.getReceiverPayload(req.headers['authorization']))
                res.send(p)
            } catch (error) {
                console.log("error in findAllRoutesByUser controller")
            }
        })

        router.post('/createTask/', async (req, res)=>{
            try {
                let p = await repo.createTask(repo.getReceiverPayload(req.headers['authorization']), req.body)

                res.send(p)
            } catch (ex) {
                console.log("error in createTask controller "+ex)
            }
        })

        router.get('/getOpenTasksByReceiver/', async (req, res)=> {
            try {
                let p = await repo.getOpenTasksByReceiver(repo.getReceiverPayload(req.headers['authorization']))

                res.send(p);
            } catch (ex) {
                console.log("error in getOpenTasksByReceiver controller " + ex)
            }
        })

        router.get('/getRouteByTask/:id', async (req, res)=>{
            try {
                let p = await repo.getRouteByTask(req.params.id);
                res.send(p)
            } catch (ex) {
                console.log("error in getRouteByTask controller")
            }
        })

        router.get('/getCreatedTasks/', async (req, res) => {
            try {
                let p = await repo.getCreatedTasks(repo.getReceiverPayload(req.headers['authorization']))

                res.send(p)
            } catch (ex) {
                console.log("error in getCreatedTasks controller "+ex)
            }
        })

        return router;
    }
}