import * as mariadb from 'mariadb';
import { IPosition } from '../entity/position';
import { ISender } from '../entity/sender';

export class Repository {
    public pool: mariadb.Pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test',
        connectionLimit: 5
    });

    public async createUser(sender: ISender){
        try {
            let x = await this.pool.query("INSERT INTO sender VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [null, sender.username, sender.firstname, sender.lastname, sender.sex, sender.email, sender.number, sender.photo, sender.photo, sender.zib, sender.street, sender.housenr]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in createUser repo")
        }
    }

    public async newRoute(id:string, car: string){
        try {
            let x = await this.pool.query("INSERT INTO route VALUE (?, ?, ?, ?, ?)", [null, new Date(), null, car, id]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in newRoute repo")
        }
    }

    public async savePosition(position: IPosition) {
        try {
            let x = await this.pool.query("INSERT INTO position VALUE (?, ?, ?, ?, ?)", [null, position.routeid, position.lat, position.lng, new Date()]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in save repo")
        }
    }
}