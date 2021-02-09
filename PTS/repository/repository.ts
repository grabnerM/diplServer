import * as mariadb from 'mariadb';
import { IPosition } from '../entity/position';
import { ISender } from '../entity/sender';
import { IReceiver } from '../entity/receiver';
import { ITask } from '../entity/task';

const jwt = require('jsonwebtoken')
require('dotenv').config()

export class Repository {
    
    public pool: mariadb.Pool = mariadb.createPool({
        host: '195.128.100.64',
        user: 'pts',
        password: 'sXkh8XkBWYVfZAy',
        database: 'pts',
        connectionLimit: 15
    });
    
    public getReceiverPayload(authHeader: any){
        try {
            const token = authHeader && authHeader.split(' ')[1]
            let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            return payload.user.receiverid
        } catch(ex) {
            return false
        }
    }

    public getSenderPayload(authHeader: any){
        try {
            const token = authHeader && authHeader.split(' ')[1]
            let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            return payload.user.senderid
        } catch(ex) {
            return false
        }
    }

    public async createSender(sender: ISender){
        try {
            let x = await this.pool.query("INSERT INTO sender VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
             [null, sender.username, sender.password, sender.firstname, sender.lastname, sender.sex, sender.email, sender.zip, sender.street, sender.housenr, sender.city]);
           
            return x
        } catch(ex){
            console.log("error in createSender repo" + ex)
        }
    }

    public async createReceiver(receiver: IReceiver){
        try {
            let x = await this.pool.query("INSERT INTO receiver VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [null, receiver.username, receiver.password, receiver.firstname, receiver.lastname, receiver.sex, receiver.email, receiver.number, receiver.zip, receiver.street, receiver.housenr, receiver.city]);
            
            return x
        } catch(ex){
            console.log("error in createReceiver repo" + ex)
        }
    }

    public async startRoute(id:string){
        try {
            let x = await this.pool.query("update route set starttime = ? where routeid = ?", 
            [new Date(Date.now()), id]);
            
            return x
        } catch(ex){
            console.log("error in newRoute repo")
        }
    }

    public async endRoute(id:string){
        try {
            let x = await this.pool.query("UPDATE route SET endtime = ? WHERE routeid = ? and endtime is null", 
            [new Date(Date.now()), id]);
            
            return x
        } catch(ex){
            console.log("error in endRoute repo: "+ex)
        }
    }

    public async savePosition(position: IPosition) {
        try {
            let x = await this.pool.query("INSERT INTO position VALUE (?, ?, ?, ?, ?)", 
            [null, position.routeid, position.lat, position.lng, new Date(Date.now())]);
            
            return x
        } catch(ex){
            console.log("error in savepos repo: "+ex)
        }
    }

    public async createTask(id:number, task: ITask){
        try {
            let x = await this.pool.query("INSERT INTO task VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [null, task.startlat, task.startlng, task.endlat, task.endlng, task.description, task.status, id, task.title]);
            
            return x
        } catch (ex) {
            console.log("error in createTask repo: "+ex)
        }
    }

    public async acceptTask(id:number, taskid:string){
        try {
            let x = await this.pool.query("update task set status = 0 where taskid = ?", [taskid])
            let y = await this.pool.query("insert into route value (?, ?, ?, ?, ?)", [null, null, null, taskid, id])

            return y
        } catch(ex){

        }
    }

    public async createAccessToken(user: any){
        try {
            let token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 18000})
            
            return token
        } catch(ex){
            console.log("error in create token")
        }
        
    }

    public async createRefreshToken(user: any){
        try {
            let token = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 2.628e+6})
            
            return {refreshtoken: token}
        } catch(ex){
            console.log("error in create token")
        }
        
    }

    public async senderlogin(sender: { email: any; password: any; }){
        try {
            let x = await this.pool.query("select * from sender where email=? AND password=?", 
            [sender.email, sender.password])
            
            return x
        } catch (ex) {
            console.log("error in sender login")
        }
    }

    public async receiverlogin(receiver: { email: any; password: any; }){
        try {
            let x = await this.pool.query("select receiverid, username, firstname, lastname, sex, email, number, zip, street, housenr, city from receiver"
            + " where email=? AND password=?", [receiver.email, receiver.password])
            
            return x
        } catch (ex) {
            console.log("error in receiver login repository: "+ex)
        }
    }

    public async getAllPositions(id: any){
        try {
            
            let x = await this.pool.query("SELECT r.starttime, lat, lng, time, s.username, s.firstname, s.lastname, t.title FROM (SELECT max(positionid) AS positionid FROM position GROUP BY routeid) AS a "+
            " INNER JOIN position AS b ON (a.positionid = b.positionid) JOIN route r ON (b.routeid = r.routeid) JOIN task t ON (r.taskid = t.taskid) JOIN sender s ON (r.senderid = s.senderid)"+
            " WHERE t.receiverid = ? and t.status != 1;", [id])
            /* = await this.pool.query("SELECT distinct ro.*, p.lat, p.lng, max(p.time), s.senderid, s.username, s.firstname, s.lastname" 
            + " FROM receiver r JOIN receiver_sender rs ON (r.receiverid = rs.receiverid) JOIN sender s ON (rs.senderid = s.senderid) JOIN route ro ON(rs.rsid = ro.rsid) JOIN position p ON (p.routeid = ro.routeid)" 
            + " where r.receiverid = ? group BY s.senderid;", [id])*/

            return x
        } catch (ex) {
            console.log("error in getAllPositions repo: "+ex)
        }
    }

    public async getOpenTasks(){
        try {
            let x = await this.pool.query("select distinct t.*, r.username from task t join receiver r on (t.receiverid = r.receiverid) "
             + "where t.status = -1")

            return x
        } catch (ex) {
            console.log("error in getAllPositions repo: "+ex)
        }
    }

    public async getRouteById(id: any) {
        try {
            let x = await this.pool.query("Select p.positionid, p.lat, p.lng, p.time from route r join position p on(r.routeid = p.routeid) where r.routeid = ?", [id])

            return x
        } catch (ex) {
            console.log("error in getRouteById repo")
        }
    }

    public async getRouteByTask(id: string) {
        try {
            let x = await this.pool.query("Select p.positionid, p.lat, p.lng, p.time from route r join position p on(r.routeid = p.routeid) where r.taskid = ?", [id])

            return x
        } catch (ex) {
            console.log("error in getRouteByTask repo")
        }
    }

    public async findOldRoutesByReceiver(id: any){
        try {
            let x = await this.pool.query("select ro.routeid, ro.starttime, ro.endtime, ro.taskid, s.*"
            + " from task t join route ro on (t.taskid = ro.taskid) join sender s on (ro.senderid = s.senderid)"
            + " where t.receiverid = ? and ro.endtime is not null;", [id]);
            /* = await this.pool.query("select r.*, s.* from receiver re join receiver_sender rs on (re.receiverid = rs.receiverid) join sender s on (rs.senderid = s.senderid) join route r on (rs.rsid = r.rsid)" 
            + " where re.receiverid = ? and r.endtime is not null", [id])*/
        
            return x
        } catch (ex) {
            console.log("error in findOldRoutesByReceiver repo "+ex)            
        }
    }

/*    public async findMostDrivingSender(id: any){
        try {
            let x = await this.pool.query("select s.*, count(r.routeid) from receiver re join receiver_sender rs on (re.receiverid = rs.receiverid) join sender s on (rs.senderid = s.senderid) join route r on (rs.rsid = r.rsid)" 
            + " where re.receiverid = ? group by s.senderid", [id])
        
            return x
        } catch (ex) {
            console.log("error in findMostDrivingSender repo")
        }
    }*/

    public async findAllRoutesByUser(id: any){
        try {
            let x/* = await this.pool.query("select r.*, s.* from route r join receiver_sender rs on (r.rsid = rs.rsid) join sender s on (rs.senderid = s.senderid) WHERE r.rsid = ?", [id]);*/
            
            return x;
        } catch (ex) {
            console.log("error in findAllRoutesByUser repo");
        }
    }

    public async getOpenTasksByReceiver(id: any){
        try {
            let x = await this.pool.query("select * from task where receiverid = ? and status < 1;", [id])

            return x;
        } catch (ex) {
            console.log("error in getOpenTasksByReceiver repo "+ex)
        }
    }

    public async getOpenTasksBySender(id: any){
        try {
            let x = await this.pool.query("select t.*, r.routeid from task t join route r ON (t.taskid = r.taskid) WHERE r.senderid = ? and t.status=0;", [id])

            return x;
        } catch (ex) {
            console.log("error in getOpenTasksBySender repo " + ex)
        }
    }

    public async getReceiverByRoute(id: any){
        try {
            let x = await this.pool.query("select t.receiverid from route r join task t on (r.taskid = t.taskid) where r.routeid = ?;", [id])

            return x;
        } catch (ex) {
            console.log("error in getReceiverByRoute repo "+ex)
        }
    }

}