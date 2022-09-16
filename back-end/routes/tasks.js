let express = require("express");
let bodyparser = require("body-parser");
let Task = require("../models/Tasks");
var ObjectId = require('mongodb').ObjectID;
let fs = require("fs");

let router = express.Router();

router.post("/save", async (req, res) => {
    try {
      let body = req.body;
      let task = new Task();
  
      if (body.data.id != "") {
        task = await Task.findById(body.data.id);
      }
      task.userid = body.data.userid;
      task.title = body.data.title;
      task.description = body.data.description;
      task.status = body.data.status;
      task.assignedon = body.data.assignedon;
      task.closedon = body.data.closedon;

      task.save().then(
        (results) => {
          res.end(JSON.stringify({ status: "success", data: results }));
        },
        (err) => {
          res.end(JSON.stringify({ status: "failed", data: err }));
        }
      );
    } catch {
      res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
  });

  router.post("/list", async (req, res) => {
    try {
      let userid = req.body.userid;
      let tasks = await Task.find().populate({path:"userid", select:['name']});
      console.log(tasks);
      if(userid != "") {
        let newtasks = Array();
        tasks.forEach(task => {
          if(task.userid._id == userid){
            newtasks.push(task);
          }
        });
        tasks = newtasks;
      }
      res.end(JSON.stringify({ status: "success", data: tasks }));
    } catch(ex) {
      console.log(ex);
      res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
  });

  router.post("/get", async (req, res) => {
    try {
      let body = req.body;
      let task = await Task.findById(body.data.id);
      res.end(JSON.stringify({ status: "success", data: task }));
    } catch {
      res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
  });
  
  router.post("/delete", async (req, res) => {
    try {
      let body = req.body;
      await Task.findByIdAndDelete(body.data.id);
      res.end(JSON.stringify({ status: "success" }));
    } catch {
      res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
  });

  module.exports = router;