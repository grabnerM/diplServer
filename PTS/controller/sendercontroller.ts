import { RequestHandler, Router } from "express";
import { Repository } from "../repository/repository";
import { Websocket } from "../websocket/websocket";

export class SenderController {
    static handler(): RequestHandler{
        let router: Router = Router();
        const repo: Repository = new Repository();
        const ws: Websocket = Websocket.getInstance();

        /**
         * Einfache Funktion zum Testen der Funktion des Sender Controllers
         */
        router.get('/echo', (req,res)=> {
            res.send('Hello NodeJS')
        });

        /**
         * Diese Funktion ist dafür zuständig, eine Position zu einer Route hinzuzufügen und eine Websocket Nachricht zu senden
         */
        router.post('/savePosition', async (req, res)=>{
            try {
                let p = await repo.savePosition(req.body);
                let i = await repo.getReceiverByRoute(req.body.routeid)
                ws.broadcast('Data changed '+i[0].receiverid);
                res.send(p);
            } catch(error){
                console.log('error in save pos');
            }
        });

        /**
         * Diese Funktion startet die Route mit der mitgelieferten ID. Außerdem wird eine Websocket Nachricht gesendet.
         */
        router.get('/startRoute/:id', async (req, res)=>{
            try {
                let p = await repo.startRoute(req.params.id);
                let i = await repo.getReceiverByRoute(req.params.id)
                ws.broadcast('Data changed '+i[0].receiverid);
                res.send(p);
            } catch(error){
                console.log('error in new route');
            }
        });

        /**
         * Diese Funktion beendet die Route mit der mitgelieferten ID. Außerdem wird eine Websocket Nachricht gesendet.
         */
        router.get('/endRoute/:id', async (req, res)=>{
            try {
                let p = await repo.endRoute(req.params.id);
                let i = await repo.getReceiverByRoute(req.params.id)
                ws.broadcast('Data changed '+i[0].receiverid);
                res.send(p);
            } catch (error) {
                console.log('error in endRoute controller')
            }
        })

        /**
         * Diese Funktion liefert alle offenen Aufträge.
         */
        router.get('/getOpenTasks/', async (req, res)=>{
            try {
                let p = await repo.getOpenTasks();
                ws.broadcast('Data changed')
                res.send(p)
            } catch (ex){
                console.log('error in getOpenTasks controller '+ex)
            }
        })

        /**
         * Diese Funktion weißt den Auftrag mit der mitgelieferten ID, dem Kurier zu.
         */
        router.get('/acceptTask/:id', async (req, res) => {
            try {
                let p = await repo.acceptTask(repo.getSenderPayload(req.headers['authorization']), req.params.id)

                res.send(p)
            } catch (ex) {
                console.log('error in acceptTask controller '+ex)
            }
        })

        /**
         * Diese Funktion liefert alle Aufträge die von einem Kurier angenommen, aber noch nicht abgeschlossen worden sind.
         */
        router.get('/getOpenTasksBySender/', async (req, res) => {
            try {
               let p = await repo.getOpenTasksBySender(repo.getSenderPayload(req.headers['authorization']));
               
               res.send(p)
            } catch (ex) {
                console.log('error in getOpenTasksBySender controller '+ex)
            }
        })

        /**
         * Diese Funktion liefert alle abgeschlossenen Aufträge eines Kuriers.
         */
        router.get('/getFinishedTasksBySender/', async (req, res) => {
            try {
               let p = await repo.getFinishedTasksBySender(repo.getSenderPayload(req.headers['authorization']));
               
               res.send(p)
            } catch (ex) {
                console.log('error in getOpenTasksBySender controller '+ex)
            }
        })

        return router;
    }
}