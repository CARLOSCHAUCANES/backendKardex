const bcrypt = require("bcryptjs");
const CONFIG = require("../config/config")

const Encrypt = (secretWord)=>{
    try{
        let salt = bcrypt.genSaltSync(CONFIG.NUMBERSALTSENCRYP);
        let wordEncrypt = bcrypt.hashSync(secretWord,salt);
        return  wordEncrypt;
    }
    catch(err)
    {
       throw err;
    }
return '';
}

const Compare =  (encryptWord,wordDesencryptada)=>{
    try{
        const wordValidate = bcrypt.compareSync(wordDesencryptada,encryptWord);
        return wordValidate;
    }
    catch(err){
        throw err;
    }
    return false;
}


module.exports = {Encrypt,Compare};