const {Router} = require('express');
const router = Router();
const CONFIGUSER = require('../config/configUser');

const {signUp,signIn,listUsers,task,checkAuthorization, checkEmail,checkCedula,updateProfileUser } = require("../controller/UserController");
const {verifyToken} = require('../middleware/token');

router.get('/api',(req,res)=>res.send('INICIO'));
//registrar usuario
router.post(CONFIGUSER.ROUTES.SIGNUP,signUp);
//login usuario
router.post(CONFIGUSER.ROUTES.SIGNIN,signIn);
//Listar Usuarios
router.get(CONFIGUSER.ROUTES.LISTAUSUARIOS,verifyToken,listUsers);
//listado de tareas
router.get(CONFIGUSER.ROUTES.TASK,task);
//listado de tareas privaas
router.get(CONFIGUSER.ROUTES.PRIVATETASK,verifyToken,checkAuthorization);
//check email
router.post(CONFIGUSER.ROUTES.CHECKEMAIL,checkEmail);
//check cedula if exist
router.post(CONFIGUSER.ROUTES.CHECKCEDULA,checkCedula);
//check if the token is valid or current
router.post(CONFIGUSER.ROUTES.UPDATEPROFILEUSER,verifyToken,updateProfileUser);
module.exports = router;