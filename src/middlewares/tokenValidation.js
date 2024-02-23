import  Jwt  from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const requiredAuth = (req, res, next) => {
    //console.log('authentication' );

    const {token} = req.cookies;
    //console.log(token);
    if(!token)
    return res.status(401).json({message : "No token, Authorization Denied."});

    Jwt.verify(token, TOKEN_SECRET, (err, user)=>{
        if(err) res.status(403).json({ message : "Token invalid"});

        req.user = user;
        next();
    })
}