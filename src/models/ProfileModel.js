const {Schema,model} =require('mongoose');
const profileSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    }
},{
    versionKey:false
});
module.exports = model('Profile',profileSchema);