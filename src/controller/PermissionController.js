const Permission = require('../models/PermissionModel');
const RESPONSE = require('../config/Response');
const CONFIG = require('../config/config');
const CONFIGPERMISSION = require('../config/configPermission');

const savePermission = async (req,res)=>{
    try{
        const {route,description,profiles} = req.body;
        const newPermission = new Permission({route,description,profiles});
        const resp = await newPermission.save();
        if(resp){
            res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,resp,CONFIGPERMISSION.PERMISSIONSAVED));
        }
        else{
            res.status(CONFIG.CODES.C502).json(RESPONSE(CONFIG.CODES.C502,"",CONFIGPERMISSION.PERMISSIONNOSAVED));
        }
        
    }catch(err){
        res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,err,CONFIG.SERVERMESSAGES.PROBLEMSERVER));
    }
}

const getPermissionByNameRoute = async(req,res)=>{
    const {route,perfil} = req.body;
    console.log("searching",perfil)
    let resp = false;
    await Permission.findOne({route}).exec((err,permission)=>{
        console.log(permission);
        let permissions = permission.profiles;
        for(let prof of permissions){
            console.log(prof);
            if(prof == perfil)return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,true,CONFIGPERMISSION.AUTHORIZEDPERMISSION));
        }
        res.status(CONFIG.CODES.C403).json(RESPONSE(CONFIG.CODES.C403,false,CONFIGPERMISSION.NOAUTHORIZEDPERMISSION));
    })
}

module.exports = {
    savePermission,
    getPermissionByNameRoute
}