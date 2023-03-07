const Permission = require('../models/PermissionModel');
const {ObjectId} = require("mongoose").ObjectId;
const RESPONSE = require('../config/Response');
const CONFIG = require('../config/config');
const CONFIGPERMISSION = require('../config/configPermission');

const savePermission = (req,res)=>{
    try{
        const {route,description,profiles} = req.body;
        const newPermission = new Permission({"_id":null,route,description,profiles});
        newPermission.save().then(per=>{
            if(per){
                res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,per,CONFIGPERMISSION.PERMISSIONSAVED));
            }
            else{
                res.status(CONFIG.CODES.C502).json(RESPONSE(CONFIG.CODES.C502,per,CONFIGPERMISSION.PERMISSIONNOSAVED));
            }
        });

        
    }catch(err){
        res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,err,CONFIG.SERVERMESSAGES.PROBLEMSERVER));
    }
}



/*const savePermission = async (req,res)=>{
    try{
        const {route,description,profiles} = req.body;
        const newPermission = new Permission({"_id":null,route,description,profiles});
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
}*/

const updatePermission = async (req,res)=>{
    try{
        const {_id,route,description,profiles} = req.body;
        const resp = await Permission.updateOne(
            {"_id":_id},
            {
                $set:{"route":route,"description":description,"profiles":profiles}  
            }
        );
        if(resp){
            res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,resp,CONFIGPERMISSION.PERMISSIONUPDATE));
        }
        else
        {
            res.status(CONFIG.CODES.C502).json(RESPONSE(CONFIG.CODES.C502,"",CONFIGPERMISSION.PERMISSIONNOSAVED));
        }
        
    }catch(err){
        res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,err,CONFIG.SERVERMESSAGES.PROBLEMSERVER));
    }
}


const getPermissionByNameRoute = async(req,res)=>{
    const {route,profile} = req.body;
    let resp = false;
    await Permission.findOne({route}).exec((err,permission)=>{
        if(permission){
            let permissions = permission.profiles;
            for(let prof of permissions){
                if(prof == profile)return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,true,CONFIGPERMISSION.AUTHORIZEDPERMISSION));
            }
        }
        res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,false,CONFIGPERMISSION.NOAUTHORIZEDPERMISSION));
    })
}
const getListPermissions = async(req,res)=>{
    const {route,profile} = req.body;
    let resp = false;
    await Permission.find()
    .populate('profiles')
    .exec((err,permissions)=>{
        if(permissions){
            return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,permissions,'')); 
        }
        return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,[],''));
    })
}

module.exports = {
    savePermission,
    getPermissionByNameRoute,
    getListPermissions,
    updatePermission
}