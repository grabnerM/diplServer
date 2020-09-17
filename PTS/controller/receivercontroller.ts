import { RequestHandler, Router } from "express";
import { Repository } from "../repository/repository"

export class ReceiverController {
    static handler(): RequestHandler{
        let router: Router = Router();

        const repo: Repository = new Repository();

        router.get('/echo', (req,res)=> {
            res.send('Hello NodeJS')
        });

        return router;
    }
}