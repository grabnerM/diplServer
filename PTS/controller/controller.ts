import { RequestHandler, Router } from "express";
import { Repository } from "../repository/repository"

export class Controller {
    static handler(): RequestHandler{
        let router: Router = Router();

        router.post('/login', function(req, res){
            //Testweise User daten
            let user = { id: 3 }
        
            let token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 600})
            res.json({
                token: token
            })
        })

        return router;
    }
}