/*const jwt = require('json-web-token')

exports.verify = function(req: { header: (arg0: string) => any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (): any; new(): any; }; }; }, next: () => void){
    let accessToken = req.header("authorization");

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        next()
    }
    catch(e){
        //if an error occured return request unauthorized error
        return res.status(401).send()
    }
}*/