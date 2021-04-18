import * as mariadb from 'mariadb';
import { IPosition } from '../entity/position';
import { ISender } from '../entity/sender';
import { IReceiver } from '../entity/receiver';
import { ITask } from '../entity/task';

const jwt = require('jsonwebtoken')
require('dotenv').config()

/*
  Autor: Jakob Hocheneder
  Titel: Repository
  Beschreibung: Hier sind alle Funktionen die vom Controller aufgerufen werden und zumeist auf die Datenbank zugreifen.
*/
export class Repository {
    
    /**
     * Datenbankverbindung
     */
    public pool: mariadb.Pool = mariadb.createPool({
        host: '195.128.100.64',
        user: 'pts',
        password: 'sXkh8XkBWYVfZAy',
        database: 'pts',
        connectionLimit: 15
    });
    
    /**
     * Entschlüsselung des JWTs vom Auftraggeber
     * @param authHeader Der Header des Requests
     */
    public getReceiverPayload(authHeader: any){
        try {
            const token = authHeader && authHeader.split(' ')[1]
            let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            return payload.user.receiverid
        } catch(ex) {
            return false
        }
    }

    /**
     * Entschlüsselung des JWTs vom Kurier
     * @param authHeader Der Header des Requests
     */
    public getSenderPayload(authHeader: any){
        try {
            const token = authHeader && authHeader.split(' ')[1]
            let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            return payload.user.senderid
        } catch(ex) {
            return false
        }
    }

    /**
     * Erstellen eines Kuriers in der Datenbank
     * @param sender Objekt, welches alle Informationen des Kuriers enthält
     */
    public async createSender(sender: ISender){
        try {
            let x = await this.pool.query("INSERT INTO sender VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
             [null, sender.username, sender.password, sender.firstname, sender.lastname, sender.sex, sender.email, sender.zip, sender.street, sender.housenr, sender.city]);
           
            return x
        } catch(ex){
            console.log("error in createSender repo" + ex)
        }
    }

    /**
     * Erstellen eines Auftraggebers in der Datenbank
     * @param receiver Objekt, welches alle Informationen des Auftraggebers enthält
     */
    public async createReceiver(receiver: IReceiver){
        try {
            let x = await this.pool.query("INSERT INTO receiver VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [null, receiver.username, receiver.password, receiver.firstname, receiver.lastname, receiver.sex, receiver.email, receiver.number, receiver.zip, receiver.street, receiver.housenr, receiver.city]);
            
            return x
        } catch(ex){
            console.log("error in createReceiver repo" + ex)
        }
    }

    /**
     * Starten einer Route -> Startzeit der Route wird in der Datenbank gesetzt
     * @param id Id der Route die gestartet werden soll
     */
    public async startRoute(id:string){
        try {
            let x = await this.pool.query("update route set starttime = ? where routeid = ?", 
            [new Date(Date.now()), id]);
            
            return x
        } catch(ex){
            console.log("error in newRoute repo")
        }
    }

    /**
     * Route wird beendet -> Endzeit der ROute wird in der Datenabnk gesetzt und der Status des Tasks wird auf 1 geändert
     * @param id Id der Route die beendet werden soll
     */
    public async endRoute(id:string){
        try {
            let x = await this.pool.query("UPDATE route SET endtime = ? WHERE routeid = ? and endtime is null", 
            [new Date(Date.now()), id]);

            let y = await this.pool.query("UPDATE task t JOIN route r ON (t.taskid = r.taskid) SET status = 1 WHERE routeid = ?",
            [id]); 
            
            return x
        } catch(ex){
            console.log("error in endRoute repo: "+ex)
        }
    }

    /**
     * Position wird zu einer Route hinzugefügt
     * @param position Objekt der Position, welche eingefügt werden soll
     */
    public async savePosition(position: IPosition) {
        try {
            let x = await this.pool.query("INSERT INTO position VALUE (?, ?, ?, ?, ?)", 
            [null, position.routeid, position.lat, position.lng, new Date(Date.now())]);
            
            return x
        } catch(ex){
            console.log("error in savepos repo: "+ex)
        }
    }
    
    /**
     * Erstellen eines Auftrags
     * @param id Id des Auftraggebers
     * @param task Objekt, welches alle Informationen des Auftrags enthält
     */
    public async createTask(id:number, task: ITask){
        try {
            let x = await this.pool.query("INSERT INTO task VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [null, task.startlat, task.startlng, task.endlat, task.endlng, task.description, task.status, id, task.title]);
            
            return x
        } catch (ex) {
            console.log("error in createTask repo: "+ex)
        }
    }

    /**
     * Annehmen eines Tasks von einem Kurier
     * @param id Id des Kuriers
     * @param taskid Id des Auftrags der Angenommen werden soll
     */
    public async acceptTask(id:number, taskid:string){
        try {
            let x = await this.pool.query("update task set status = 0 where taskid = ?", [taskid])
            let y = await this.pool.query("insert into route value (?, ?, ?, ?, ?)", [null, null, null, taskid, id])

            return y
        } catch(ex){

        }
    }

    /**
     * Erstellen eines JSON Web Tokens
     * @param user User für welchen der Token erstell werden soll
     */
    public async createAccessToken(user: any){
        try {
            let token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 18000})
            
            return token
        } catch(ex){
            console.log("error in create token")
        }
        
    }

    /**
     * Login für den Kurier -> Es wird in der Datenbank nach der Email, Passwort Kombination gesucht
     * @param sender Objekt des Kuriers der sich einloggen möchte
     */
    public async senderlogin(sender: { email: any; password: any; }){
        try {
            let x = await this.pool.query("select * from sender where email=? AND password=?", 
            [sender.email, sender.password])
            
            return x
        } catch (ex) {
            console.log("error in sender login")
        }
    }

    /**
     * Login für den Auftraggeber -> Es wird in der Datenbank nach der Email, Passwort Kombination gesucht
     * @param receiver Objekt des Auftraggebers der sich einloggen möchte
     */
    public async receiverlogin(receiver: { email: any; password: any; }){
        try {
            let x = await this.pool.query("select receiverid, username, firstname, lastname, sex, email, number, zip, street, housenr, city from receiver"
            + " where email=? AND password=?", [receiver.email, receiver.password])
            
            return x
        } catch (ex) {
            console.log("error in receiver login repository: "+ex)
        }
    }

    /**
     * Liefert alle aktuellen Standorte der Kuriere die einen Auftrag für den Auftraggeber fahren
     * @param id Id des Auftraggebners
     */
    public async getAllPositions(id: any){
        try {
            
            let x = await this.pool.query("SELECT r.starttime, lat, lng, time, s.username, s.firstname, s.lastname, t.title FROM (SELECT max(positionid) AS positionid FROM position GROUP BY routeid) AS a "+
            " INNER JOIN position AS b ON (a.positionid = b.positionid) JOIN route r ON (b.routeid = r.routeid) JOIN task t ON (r.taskid = t.taskid) JOIN sender s ON (r.senderid = s.senderid)"+
            " WHERE t.receiverid = ? and t.status != 1;", [id])

            return x
        } catch (ex) {
            console.log("error in getAllPositions repo: "+ex)
        }
    }

    /**
     * Liefert alle Auftrage mit dem Status -1
     */
    public async getOpenTasks(){
        try {
            let x = await this.pool.query("select distinct t.*, r.username from task t join receiver r on (t.receiverid = r.receiverid) where t.status = -1")

            return x
        } catch (ex) {
            console.log("error in getAllPositions repo: "+ex)
        }
    }

    /**
     * Liefert alle Positionen einer Route
     * @param id Id der Route
     */
    public async getRouteById(id: any) {
        try {
            let x = await this.pool.query("Select p.positionid, p.lat, p.lng, p.time from route r join position p on(r.routeid = p.routeid) where r.routeid = ?", [id])

            return x
        } catch (ex) {
            console.log("error in getRouteById repo")
        }
    }

    /**
     * Liefert die Route eines Auftrags
     * @param id Id des Auftrags
     */
    public async getRouteByTask(id: string) {
        try {
            let x = await this.pool.query("Select p.positionid, p.lat, p.lng, p.time from route r join position p on(r.routeid = p.routeid) where r.taskid = ?", [id])

            return x
        } catch (ex) {
            console.log("error in getRouteByTask repo")
        }
    }

    /**
     * Liefert die alle Routen die bisher für den Auftraggeber gefahren wurden
     * @param id Id des Auftraggebers
     */
    public async findOldRoutesByReceiver(id: any){
        try {
            let x = await this.pool.query("select ro.routeid, ro.starttime, ro.endtime, ro.taskid, s.*"
            + " from task t join route ro on (t.taskid = ro.taskid) join sender s on (ro.senderid = s.senderid)"
            + " where t.receiverid = ? and ro.endtime is not null;", [id]);
        
            return x
        } catch (ex) {
            console.log("error in findOldRoutesByReceiver repo "+ex)            
        }
    }

    /**
     * Liefert die noch offenen Aufträge (Status -1 oder 0) des Auftraggebers
     * @param id Id des Auftraggebers
     */
    public async getOpenTasksByReceiver(id: any){
        try {
            let x = await this.pool.query("select * from task where receiverid = ? and status < 1;", [id])

            return x;
        } catch (ex) {
            console.log("error in getOpenTasksByReceiver repo "+ex)
        }
    }

    /**
     * Liefert alle offenen Aufträge des Kuriers
     * @param id Id des Kuriers
     */
    public async getOpenTasksBySender(id: any){
        try {
            let x = await this.pool.query("select t.*, r.routeid from task t join route r ON (t.taskid = r.taskid) WHERE r.senderid = ? and t.status=0;", [id])

            return x;
        } catch (ex) {
            console.log("error in getOpenTasksBySender repo " + ex)
        }
    }

    /**
     * Liefert alle abgeschlossenen Aufträge des Kuriers
     * @param id Id des Kuriers
     */
    public async getFinishedTasksBySender(id: any){
        try {
            let x = await this.pool.query("select t.*, r.routeid, r.starttime, r.endtime from task t join route r ON (t.taskid = r.taskid) WHERE r.senderid = ? and t.status=1;", [id])

            return x;
        } catch (ex) {
            console.log("error in getOpenTasksBySender repo " + ex)
        }
    }

    /**
     * Liefert die Id des Auftraggebers zu einer Route
     * @param id Id der Route
     */
    public async getReceiverByRoute(id: any){
        try {
            let x = await this.pool.query("select t.receiverid from route r join task t on (r.taskid = t.taskid) where r.routeid = ?;", [id])

            return x;
        } catch (ex) {
            console.log("error in getReceiverByRoute repo "+ex)
        }
    }

    /**
     * Liefert alle Aufträge die vom Auftraggeber erstellt wurden
     * @param id Id des Auftraggebers
     */
    public async getCreatedTasks(id: any){
        try {
            let x = await this.pool.query("SELECT task.* FROM task left outer JOIN route USING (taskid) WHERE receiverid = ? AND STATUS < 1 AND route.starttime IS null;", [id])
        
            return x;
        } catch (error) {
            console.log("error in getCreatedTasks repo "+error)
        }
    }

}