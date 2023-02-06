const {Schema,model} =require('mongoose');
const userSchema = new Schema({
    cedula:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{type:Schema.Types.ObjectId,ref:'Profile'}
},{
    timestamps:true,
    versionKey:false
}
);
module.exports = model('User',userSchema);