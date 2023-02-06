const CONFIGUSER = {
    USERSAVED:"Usuario almacenado",
    EMAILNOTEXIST:"Correo electrónico no existe",
    CEDULANOTEXIST:"Cédula no existe",
    WORONGPASSWORD:"Contraseña Incorrecta",
    NOREGISTEREDUSERS:"No hay usuarios registrados",
    LOGGEDUSER:"Usuario logeado",
    UNAUTHORIZED:"El usuario no se encuentra autorizado",
    AUTHORIZED:"Usuario autorizado",
    NOUPDATE:"No fue posible actualizar, Intentar mas tarde",
    UPDATED:"Actualización exitosa",
    ROUTES:{
        SIGNUP:'/api/signup',
        SIGNIN:'/api/signin',
        LISTAUSUARIOS:'/api/list-users',
        TASK:'/api/task',
        PRIVATETASK:'/api/check-authorization',
        PROFILE:'/api/profile',
        CHECKEMAIL:'/api/checkemail',
        CHECKCEDULA:'/api/checkcedula',
        CHECKTOKEN:'/api/checktoken',
        UPDATEPROFILEUSER:'/api/updateProfileUser'
    },
    FIELDSUSER:{
        email:'email',
        cedula:'cedula',
        name:'name',
        lastname:'lastname'
    }

}
module.exports = CONFIGUSER;