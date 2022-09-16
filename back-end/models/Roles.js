let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        name:{type:String, requied:true},
        rolepermission:{type:Boolean, required:true},
        userpermission:{type:Boolean, required:true}
    }
);
let Role =  mongoose.model("Roles", schema);
module.exports = Role;