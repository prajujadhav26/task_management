let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        roleid:{type:mongoose.Schema.Types.ObjectId, ref:'Roles'},
        name:{type:String, requied:true},
        email:{type:String, requied:true},
        password:{type:String, required:true}
    }
);
let User =  mongoose.model("Users", schema);
module.exports = User;