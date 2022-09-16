let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        userid:{type:mongoose.Schema.Types.ObjectId, ref:'Users'},
        title:{type:String, requied:true},
        description:{type:String, requied:true},
        status:{type:String, required:true},
        assignedon:{type:String, required:true},
        closedon:{type:String}
    }
);
let Task =  mongoose.model("Tasks", schema);
module.exports = Task;