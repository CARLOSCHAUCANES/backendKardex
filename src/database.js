require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(db=>console.log("database is connected"))
.catch(err=>console.log(err))