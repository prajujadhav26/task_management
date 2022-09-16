let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require("body-parser");

let app = express();

app.use(express.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method == "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
        return res.status(200).json({});
    }
    next();
});

mongoose.connect("mongodb://localhost:27017/taskmanagement");
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.on("open", () => console.log("Connection Established...."));

app.get("/", function(req, res){
    res.send("Welcome to Task Management Backend");
    res.end();
});

app.use("/admin", require("./routes/admin"));
app.use("/roles", require("./routes/roles"));
app.use("/users", require("./routes/users"));
app.use("/tasks", require("./routes/tasks"));

app.listen(8081, function(){
    console.log("Task Management Backend Connection established");
})