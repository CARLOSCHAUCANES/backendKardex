const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const RESPONSE = require('../config/Response');
const CONFIG = require('../config/config');
const CONFIGUSER = require('../config/configUser');
const {Encrypt,Compare} = require('../handler/encrypt');
const {upperCaseString} = require('../handler/operationString');

const signUp = async (req,res)=>{
    try{
        const {cedula,name,lastName,email,phone,address,password,profile} = req.body;
        let password1 = Encrypt(password);
        if(password1=='') return  res.status(CONFIG.CODES.C503).json(RESPONSE(CONFIG.CODES.C503,{},CONFIG.SERVERMESSAGES.ERRORENCRYPT));
        let name1 = upperCaseString(name);
        let lastName1 = upperCaseString(lastName);
        const newUser = new User({cedula,name:name1,lastName:lastName1,email,phone,address,password:password1,profile});
        await newUser.save();
        const token = jwt.sign({_id:newUser._id,name:newUser.name,email:newUser.email},CONFIG.SECRETKEYTOKEN,
            {
                expiresIn:CONFIG.TIMEEXPIRETOKEN
            }
        );
        res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,{token,"user":newUser},CONFIGUSER.USERSAVED));
    }catch(err){
        res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,err,CONFIG.SERVERMESSAGES.PROBLEMSERVER));
    }
}

const signIn = async (req,res)=>{
    
        const {email,password} = req.body;
        const user = await User.findOne({'email':email});
        if(!user)return res.status(CONFIG.CODES.C401).json(RESPONSE(CONFIG.CODES.C401,{},CONFIGUSER.EMAILNOTEXIST));
        let compare = Compare(user.password,password);
        if(!compare) return res.status(CONFIG.CODES.C401).json(RESPONSE(CONFIG.CODES.C401,{},CONFIGUSER.WORONGPASSWORD));
        const token = jwt.sign({_id:user._id,name:user.name,email:user.email},CONFIG.SECRETKEYTOKEN,
            {
            expiresIn:CONFIG.TIMEEXPIRETOKEN
            });
        res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,{token,user},CONFIGUSER.LOGGEDUSER));
}

const listUsers = async (req,res)=>{
    try{
        const users = await User.find();
         User.find({})
         .populate('profile')
         .exec((err,profiles)=>{
            if(!users)return  res.status(CONFIG.CODES.C401).json(RESPONSE(CONFIG.CODES.C401,{},CONFIGUSER.NOREGISTEREDUSERS));
            return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,profiles,''));
         });
    }catch(err){
        return res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,err,GLOBAL.PROBLEMSERVER));
    }
}

const checkEmail = async(req,res)=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user)return res.json(RESPONSE(CONFIG.CODES.C403,false,CONFIGUSER.EMAILNOTEXIST));
        return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,true,user));
    }catch(err){
        res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,false,CONFIG.SERVERMESSAGES.PROBLEMSERVER));
    }
}
//Verifica que la cedula sea unica
const checkCedula = async(req,res)=>{
    try{
        const {cedula} = req.body;
        const user = await User.findOne({cedula});
        if(!user)return res.json(RESPONSE(CONFIG.CODES.C403,false,CONFIGUSER.CEDULANOTEXIST));
        return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,true,user));
    }catch(err){
        res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,false,CONFIG.SERVERMESSAGES.PROBLEMSERVER));
    }

}
//update profile to a specific user
const updateProfileUser = async(req,res)=>{
    try
    {
        const {_id,profile} = req.body;
        const filter = {_id};
        const update = {profile};
        let updatedUser = await User.findOneAndUpdate(filter,update,{new:true});
        if(!updatedUser)return res.json(RESPONSE(CONFIG.CODES.C403,false,CONFIGUSER.NOUPDATE));
        return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,updatedUser,CONFIGUSER.UPDATED));
    }catch(err){
        res.status(CONFIG.CODES.C501).json(RESPONSE(CONFIG.CODES.C501,false,CONFIG.SERVERMESSAGES.PROBLEMSERVER));
    }
}


const task = (req,res)=>{
    res.json([
        {
            _id:1,
            name:'task 1',
            description:"Lorem ipsun",
            date:"2022-11-30T23:03:31.868+00:00"
        },
        {
            _id:2,
            name:'task 2',
            description:"Lorem ipsun",
            date:"2022-11-30T23:03:31.868+00:00"
        },
        {
            _id:3,
            name:'task 3',
            description:"Lorem ipsun",
            date:"2022-11-30T23:03:31.868+00:00"
        },
        {
            _id:4,
            name:'task 4',
            description:"Lorem ipsun",
            date:"2022-11-30T23:03:31.868+00:00"
        }
    ]
        );
}

const checkAuthorization = (req,res)=>{
    res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,true,CONFIGUSER.AUTHORIZED));
}



module.exports = 
{   
    signUp,
    signIn,
    listUsers,
    checkAuthorization,
    checkEmail,
    checkCedula,
    updateProfileUser,
    task
}