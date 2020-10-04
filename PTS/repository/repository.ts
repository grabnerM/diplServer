import * as mariadb from 'mariadb';
import { IPosition } from '../entity/position';
import { ISender } from '../entity/sender';
import { IReceiver } from '../entity/receiver';

const jwt = require('jsonwebtoken')
require('dotenv').config()

export class Repository {
    public pool: mariadb.Pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'pts',
        connectionLimit: 5
    });
    

    public async createSender(sender: ISender){
        try {
            let x = await this.pool.query("INSERT INTO sender VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
             [null, sender.username, sender.password, sender.firstname, sender.lastname, sender.sex, sender.email, sender.number, sender.photo, sender.zib, sender.street, sender.housenr]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in createUser repo")
        }
    }

    public async createReceiver(receiver: IReceiver){
        try {
            let x = await this.pool.query("INSERT INTO receiver VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [null, receiver.name, receiver.veh, receiver.username, receiver.password, receiver.firstname, receiver.lastname, receiver.sex, receiver.email, receiver.number, receiver.photo, receiver.zib, receiver.street, receiver.housenr]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in createReceiver repo")
        }
    }

    public async newRoute(id:string, car: { num: any; }){
        try {
            let x = await this.pool.query("INSERT INTO route VALUE (?, ?, ?, ?, ?)", 
            [null, new Date(Date.now()), null, car.num, id]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in newRoute repo")
        }
    }

    public async endRoute(id:string){
        try {
            let x = await this.pool.query("UPDATE route SET endtime = ? WHERE routeid = ? and endtime = null", 
            [new Date(Date.now()), id]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in endRoute repo: "+ex)
        }
    }

    public async savePosition(position: IPosition) {
        try {
            console.log(position)
            let x = await this.pool.query("INSERT INTO position VALUE (?, ?, ?, ?, ?)", 
            [null, position.routeid, position.lat, position.lng, new Date(Date.now())]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in savepos repo: "+ex)
        }
    }

    public async createToken(user: any){
        try {
            let token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 1800})
            
            return {token: token}
        } catch(ex){
            console.log("error in create token")
        }
        
    }

    public async senderlogin(sender: { email: any; password: any; }){
        try {
            let x = await this.pool.query("select senderid, username, firstname, lastname, sex, email, number, photo, zib, street, housenr from sender where email=? AND password=?", 
            [sender.email, sender.password])
            //console.log(x)
            return x
        } catch (ex) {
            console.log("error in sender login")
        }
    }

    public async receiverlogin(receiver: { email: any; password: any; }){
        try {
            let x = await this.pool.query("select receiverid, name, veh, username, firstname, lastname, sex, email, number, photo, zib, street, housenr from receiver"
            + " where email=? AND password=?", [receiver.email, receiver.password])

            return x
        } catch (ex) {
            console.log("error in receiver login")
        }
    }

    public async getAllPositions(id: any){
        try {
            
            let x = await this.pool.query("SELECT distinct ro.*, p.lat, p.lng, max(p.time), s.senderid, s.username, s.firstname, s.lastname" 
            + " FROM receiver r JOIN receiver_sender rs ON (r.receiverid = rs.receiverid) JOIN sender s ON (rs.senderid = s.senderid) JOIN route ro ON(rs.rsid = ro.rsid) JOIN position p ON (p.routeid = ro.routeid)" 
            + " where r.receiverid = ? group BY s.senderid;", [id])

            return x
        } catch (ex) {
            console.log("error in getAllPositions repo: "+ex)
        }
    }

    public async getRouteById(id: any) {
        try {
            let x = await this.pool.query("Select r.*, p.positionid, p.lat, p.lng, p.time from route r join position p on(r.routeid = p.routeid) where r.routeid = ?", [id])

            return x
        } catch (ex) {
            console.log("error in getRouteById repo")
        }
    }

    public async findReceiverSenderId(r_s: { receiverid: any; senderid: any; }){
        try {
            let x = await this.pool.query("select * from receiver_sender where receiverid = ? and senderid = ?", [r_s.receiverid, r_s.senderid])

            return x
        } catch (ex) {
            console.log("Error in findReceiverSenderId repo")
        }
    }

    public async findOldRoutesByReceiver(id: any){
        try {
            let x = await this.pool.query("select r.*, s.* from receiver re join receiver_sender rs on (re.receiverid = rs.receiverid) join sender s on (rs.senderid = s.senderid) join route r on (rs.rsid = r.rsid)" 
            + " where re.receiverid = ? and r.endtime is not null", [id])
        
            return x
        } catch (ex) {
            console.log("error in findOldRoutesByReceiver repo")            
        }
    }

    public async findMostDrivingSender(id: any){
        try {
            let x = await this.pool.query("select s.*, count(r.routeid) from receiver re join receiver_sender rs on (re.receiverid = rs.receiverid) join sender s on (rs.senderid = s.senderid) join route r on (rs.rsid = r.rsid)" 
            + " where re.receiverid = ? group by s.senderid", [id])
        
            return x
        } catch (ex) {
            console.log("error in findMostDrivingSender repo")
        }
    }

}