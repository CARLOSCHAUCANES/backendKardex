const CONFIGUSER = {
    USERSAVED:"Usuario almacenado",
    EMAILNOTEXIST:"Correo electrónico no existe",
    CEDULANOTEXIST:"Cédula no existe",
    WORONGPASSWORD:"Contraseña Incorrecta",
    NOREGISTEREDUSERS:"No hay usuarios registrados",
    LOGGEDUSER:"Usuario logeado",
    UNAUTHORIZED:"El usuario no se encuentra autorizado",

    ROUTES:{
        SIGNUP:'/api/signup',
        SIGNIN:'/api/signin',
        LISTAUSUARIOS:'/api/list-users',
        TASK:'/api/task',
        PRIVATETASK:'/api/private-task',
        PROFILE:'/api/profile',
        CHECKEMAIL:'/api/checkemail',
        CHECKCEDULA:'/api/checkcedula'
    },
    FIELDSUSER:{
        email:'email',
        cedula:'cedula'
    }

}
module.exports = CONFIGUSER;