const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const RESPONSE = require('../config/Response');
const CONFIG = require('../config/config');
const CONFIGUSER = require('../config/configUser');
const {Encrypt,Compare} = require('../handler/encrypt');

const signUp = async (req,res)=>{
    try{
        console.log(req.body);
        const {cedula,name,lastName,email,phone,address,password} = req.body;
        let password1 = Encrypt(password);
        if(password1=='') return  res.status(CONFIG.CODES.C503).json(RESPONSE(CONFIG.CODES.C503,{},CONFIG.SERVERMESSAGES.ERRORENCRYPT));
        console.log(cedula,name,lastName,email,phone,address,password);
        const newUser = new User({cedula,name,lastName,email,phone,address,password:password1});
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
        if(!users)return  res.status(CONFIG.CODES.C401).json(RESPONSE(CONFIG.CODES.C401,{},CONFIGUSER.NOREGISTEREDUSERS));
        return res.status(CONFIG.CODES.C200).json(RESPONSE(CONFIG.CODES.C200,users,''));
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

const privateTask = (req,res)=>{
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

const profile = (req,res)=>{
    res.send(req.userId);
}

module.exports = 
{   
    signUp,
    signIn,
    listUsers,
    task,
    privateTask,
    profile,
    checkEmail,
    checkCedula
}