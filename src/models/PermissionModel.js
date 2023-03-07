const {Schema,model,ObjectId} = require("mongoose");

const permissionSchema = new Schema({
    _id:{
        type:ObjectId,
        require:true
    },
    route:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    profiles:[{type:Schema.Types.ObjectId,ref:"Profile"}]
},{
    versionKey:false
});
module.exports = model('Permission',permissionSchema); 
