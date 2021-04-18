const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * Funktion zum Entschlüsseln und Überprüfen des JSON Web Tokens
 */
exports.ensureToken = function (req: { headers: { [x: string]: any }; token: any }, res: { sendStatus: (arg0: number) => any; status: (arg0: number) => { (): any; new(): any; send: { (): any; new(): any } } }, next: () => void){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    req.token = token
    if (token == null){
        console.log("token is null")
        return res.sendStatus(401)
    }  

    if (!token){
        console.log("token is false")
        return res.status(403).send()
    }
    let payload
    try{
        payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next()
    }
    catch(e){
        console.log("token expired or invalid")
        return res.status(401).send()
    }
}
