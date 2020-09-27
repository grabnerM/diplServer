import * as mariadb from 'mariadb';
import { IPosition } from '../entity/position';
import { ISender } from '../entity/sender';

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
            let x = await this.pool.query("INSERT INTO sender VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [null, sender.username, sender.password, sender.firstname, sender.lastname, sender.sex, sender.email, sender.number, sender.photo, sender.zib, sender.street, sender.housenr]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in createUser repo")
        }
    }

    public async newRoute(id:string, car: string){
        try {
            let x = await this.pool.query("INSERT INTO route VALUE (?, ?, ?, ?, ?)", [null, new Date(Date.now()), null, car, id]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in newRoute repo")
        }
    }

    public async endRoute(id:string){
        try {
            let x = await this.pool.query("UPDATE route SET endtime = ? WHERE id = ?", [new Date(Date.now()), id]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in endRoute repo")
        }
    }

    public async savePosition(position: IPosition) {
        try {
            let x = await this.pool.query("INSERT INTO position VALUE (?, ?, ?, ?, ?)", [null, position.routeid, position.lat, position.lng, new Date(Date.now())]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in save repo")
        }
    }

    public async createToken(user: any){
        let token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 600})
            
        return {token: token}
    }

    public async senderlogin(sender: { email: any; password: any; }){
        try {
            let x = await this.pool.query("select id, username, password, firstname, lastname, sex, email, number, photo, zib, street, housenr from sender where email=? AND password=?", [sender.email, sender.password])
            console.log(x)
            return x
        } catch (ex) {
            
        }
    }

    
}