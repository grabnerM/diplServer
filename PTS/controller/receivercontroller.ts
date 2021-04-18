import { RequestHandler, Router } from "express";
import { Repository } from "../repository/repository"
import { Websocket } from "../websocket/websocket";

const jwt = require('jsonwebtoken')
require('dotenv').config()

/*
  Autor: Jakob Hocheneder
  Titel: Controller für den Auftraggeber
  Beschreibung: In diesem Controller werden alle Requests von einem Auftraggeber entegegengenommen.
*/
export class ReceiverController {
    static handler(): RequestHandler{
        let router: Router = Router();
        

        const repo: Repository = new Repository();

        /**
         * Einfache Funktion zum Testen der Funktion des Receiver Controllers
         */
        router.get('/echo', (req,res)=> {
            res.send('Hello NodeJS')
        });

        /**
         * Diese Funktion liefert die Daten des Users auf Grundlage des JSONB Webtokens
         */
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

        /**
         * Diese Funktion liefert alle aktuellen Positionen von Kurieren, die gerade einen Auftrag des Users bearbeiten
         */
        router.get('/getAllPositions/', async (req, res)=>{
            try {
                let p = await repo.getAllPositions(repo.getReceiverPayload(req.headers['authorization']));
                res.send(p);
            } catch(error){
                console.log('error in getAllRoutes');
            }
        })

        /**
         * Diese Funktion liefert alle Positionen der Route mit der mitgelieferten ID
         */
        router.get('/getRouteById/:id', async (req, res)=>{
            try {
                let p = await repo.getRouteById(req.params.id);
                res.send(p)
            } catch (ex) {
                console.log("error in getRouteById controller")
            }
        })

        /**
         * Diese Funktion liefert eine Historie aller bisher für den User gefahrenen Routen
         */
        router.get('/findOldRoutes/', async (req,res)=>{
            try {
                let p = await repo.findOldRoutesByReceiver(repo.getReceiverPayload(req.headers['authorization']))
                res.send(p)
            } catch (ex) {
                console.log("error in findOldRoutes receivercontroller")
            }
        })

        /**
         * Diese Funktion ist für das erstellen eines Tasks zuständig
         */
        router.post('/createTask/', async (req, res)=>{
            try {
                let p = await repo.createTask(repo.getReceiverPayload(req.headers['authorization']), req.body)

                res.send(p)
            } catch (ex) {
                console.log("error in createTask controller "+ex)
            }
        })

        /**
         * Diese Funktion liefert alle Aufträge des Users, die offen oder gerade bearbeitet werden.
         */
        router.get('/getOpenTasksByReceiver/', async (req, res)=> {
            try {
                let p = await repo.getOpenTasksByReceiver(repo.getReceiverPayload(req.headers['authorization']))

                res.send(p);
            } catch (ex) {
                console.log("error in getOpenTasksByReceiver controller " + ex)
            }
        })

        /**
         * Diese Funktion liefert die Route des Auftrags mit der mitgelieferten ID
         */
        router.get('/getRouteByTask/:id', async (req, res)=>{
            try {
                let p = await repo.getRouteByTask(req.params.id);
                res.send(p)
            } catch (ex) {
                console.log("error in getRouteByTask controller")
            }
        })

        return router;
    }
}