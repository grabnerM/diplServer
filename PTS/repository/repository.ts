import * as mariadb from 'mariadb';
import { ICoordinates } from '../entity/coordinates';

export class Repository {
    public pool: mariadb.Pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test',
        connectionLimit: 5
    });

    public async save(coordinate: ICoordinates) {
        try {
            let x = await this.pool.query("INSERT INTO person VALUE (?, ?, ?)", [null, coordinate.lat, coordinate.lng]);
            console.log(x)
            return x
        } catch(ex){
            console.log("error in save repo")
        }
    }
}