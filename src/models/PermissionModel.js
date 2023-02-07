const {Schema,model} = require("mongoose");

const permissionSchema = new Schema({
    route:{
        type:String,
    },
    description:{
        type:String
    },
    profiles:[{type:Schema.Types.ObjectId,ref:"Profile"}],
},{
    versionKey:false
});
module.exports = model('Permission',permissionSchema); 
