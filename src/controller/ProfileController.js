const Profile = require('../models/ProfileModel');
const RESPONSE = require('../config/Response');
const CONFIG = require('../config/config');
const CONFIGPROFILE  = require('../config/configProfile');
//keep new type of profile
const saveProfile = async (req,res)=>{
    try{
        const {name,description,state} = req.body;
        const newPerfil = new Profile({name,description,state});
        const result = await newPerfil.save();
        if(result){

            return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,result,CONFIGPROFILE.PROFILECRATED));
        }
        else
        {
            return res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,err,CONFIG.SERVERMESSAGES.PROBLEMSERVER));
        }
    }catch{
        res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,err,CONFIG.SERVERMESSAGES.PROBLEMSERVER));
    }

}
//search profile by its name
const findProfileByName = async (req,res)=>{
    try{
        const {name} = req.body;
        await Profile.findOne({name}).exec((err,profiles)=>{
            if(!profiles)return res.json(RESPONSE(CONFIG.CODES.C403,false,CONFIGPROFILE.PROFILENOEXISTS));
            return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,profiles,''));
        }
        );
 
    }
    catch(err)
    {
        res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,err,CONFIG.SERVERMESSAGES.PROBLEMSERVER));
    }
}
//search profile by code or id
const findProfileById = async (req,res)=>{
    try{
        const {id} = req.body;
        let _id=CONFIGPROFILE.FIELDS.ID;
        await Profile.findOne({_id:id}).exec((err,profiles)=>{
            if(!profiles)return res.json(RESPONSE(CONFIG.CODES.C403,false,CONFIGPROFILE.PROFILENOEXISTS));
            return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,profiles,''));
        }
        );
    }
    catch(err)
    {     
        res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,err,CONFIG.SERVERMESSAGES.PROBLEMSERVER));
    }
}
//to list the enable or active  profiles saved
const listprofiles = (req,res)=>{
    try{
        let stateFilter = CONFIGPROFILE.FIELDS.STATE;
        const listPro = Profile.find({stateFilter:CONFIGPROFILE.ACTIVEPROFILE}).exec((err,lis)=>{
            if(!lis)return  res.status(CONFIG.CODES.C401).json(RESPONSE(CONFIG.CODES.C401,{},CONFIGPROFILE.NOREGISTERPROFILES));
            return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,lis,''));
        });

    }
    catch(err){
        res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,err,CONFIG.SERVERMESSAGES.PROBLEMSERVER)); 
    }

}
module.exports = {
    saveProfile,
    findProfileByName,
    listprofiles,
    findProfileById
}