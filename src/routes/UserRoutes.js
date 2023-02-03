const {Router} = require('express');
const router = Router();
const CONFIGUSER = require('../config/configUser');

const {signUp,signIn,listUsers,task,privateTask,profile, checkEmail,checkCedula } = require("../controller/UserController");
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
router.get(CONFIGUSER.ROUTES.PRIVATETASK,verifyToken,privateTask);
//perfil
router.get(CONFIGUSER.ROUTES.PROFILE,verifyToken,profile);
//check email
router.post(CONFIGUSER.ROUTES.CHECKEMAIL,checkEmail);
//check cedula if exist
router.post(CONFIGUSER.ROUTES.CHECKCEDULA,checkCedula)
module.exports = router;