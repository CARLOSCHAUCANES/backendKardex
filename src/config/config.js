//variables de configuracion globales
const CONFIG = {
    PORT:3000,
    SECRETKEYTOKEN:'secretkey',
    TIMEEXPIRETOKEN:'120s',
    NUMBERSALTSENCRYP:10,
    CODES:{   
        C200:200,
        C403:403,
        C500:500,
        C401:401,
        C501:501,
        C503:503,//ERROR AL MOMENTO DE ENCRYPTAR UNA CONTRASEÑA
        C502:502,//NO HAY DATOS EN EL SERRVIDOR
    },
    SERVERMESSAGES:{
        PROBLEMSERVER:'Hay un problema en el servidor, intentalo mas tarde',
        ERRORENCRYPT:"Error al momento de realizar el proceso de encriptar",
        NODATASERVER:"No hay datos para realizar la operacion"
    }

}
module.exports = CONFIG;


