const RESPONSE = require('../config/Response');
const CONFIG = require('../config/config');
const CONFIGUSER = require('../config/configUser');
const jwt = require('jsonwebtoken');
verifyToken =async (req,res,next)=>{
    try{
        if(!req.headers.authorization){
            return res.status(401).json(RESPONSE(CONFIG.CODES.C401,{},CONFIGUSER.UNAUTHORIZED)); 
        }
        const token = req.headers.authorization.split(' ')[1];
        if(token == 'null'){
            return res.status(401).json(RESPONSE(CONFIG.CODES.C401,{},CONFIGUSER.UNAUTHORIZED)); 
        }
        const payload = await jwt.verify(token, CONFIG.SECRETKEYTOKEN);
        req.userId = payload._id;
        req.userName = payload.name;
        req.userEmail = payload.email;
        next();
        }
        catch(err){
            return res.status(401).json(RESPONSE(CONFIG.CODES.C401,{},CONFIGUSER.UNAUTHORIZED)); 
        }
}

module.exports = {verifyToken};