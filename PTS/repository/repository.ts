import * as mariadb from 'mariadb';
import { IPosition } from '../entity/position';
import { ISender } from '../entity/sender';
import { IReceiver } from '../entity/receiver';

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
    

    public async createSender(sender: ISender){
        try {
            let x = await this.pool.query("INSERT INTO sender VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
             [null, sender.username, sender.password, sender.firstname, sender.lastname, sender.sex, sender.email, sender.number, sender.photo, sender.zip, sender.street, sender.housenr, sender.city]);
           
            return x
        } catch(ex){
            console.log("error in createUser repo")
        }
    }

    public async createReceiver(receiver: IReceiver){
        try {
            let x = await this.pool.query("INSERT INTO receiver VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [null, receiver.name, receiver.veh, receiver.username, receiver.password, receiver.firstname, receiver.lastname, receiver.sex, receiver.email, receiver.number, receiver.photo, receiver.zip, receiver.street, receiver.housenr, receiver.city]);
            
            return x
        } catch(ex){
            console.log("error in createReceiver repo")
        }
    }

    public async newRoute(id:string, car: { num: any; }){
        try {
            let x = await this.pool.query("INSERT INTO route VALUE (?, ?, ?, ?, ?)", 
            [null, new Date(Date.now()), null, car.num, id]);
            
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

    public async createAccessToken(user: any){
        try {
            let token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 1800})
            
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
            let x = await this.pool.query("select senderid, username, firstname, lastname, sex, email, number, photo, zip, street, housenr, city from sender where email=? AND password=?", 
            [sender.email, sender.password])
            
            return x
        } catch (ex) {
            console.log("error in sender login")
        }
    }

    public async receiverlogin(receiver: { email: any; password: any; }){
        try {
            let x = await this.pool.query("select receiverid, name, veh, username, firstname, lastname, sex, email, number, photo, zip, street, housenr, city from receiver"
            + " where email=? AND password=?", [receiver.email, receiver.password])

            return x
        } catch (ex) {
            console.log("error in receiver login repository: "+ex)
        }
    }

    public async getSenderForReceiver(id: any){
        try {
            let x = await this.pool.query("SELECT DISTINCT s.* FROM sender s JOIN receiver_sender rs ON (s.senderid = rs.senderid) WHERE rs.receiverid = ?", [id])
        
            return x
        } catch (ex) {
            console.log("error in getDriversForReceiver repo")
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
            let x = await this.pool.query("Select p.positionid, p.lat, p.lng, p.time from route r join position p on(r.routeid = p.routeid) where r.routeid = ?", [id])

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

    public async findAllRoutesByUser(id: any){
        try {
            let x = await this.pool.query("select r.*, s.* from route r join receiver_sender rs on (r.rsid = rs.rsid) join sender s on (rs.senderid = s.senderid) WHERE r.rsid = ?", [id]);

            return x;
        } catch (ex) {
            console.log("error in findAllRoutesByUser repo");
        }
    }

}