let express = require("express");
let bodyparser = require("body-parser");
let User = require("../models/Users");
let Role = require("../models/Roles");
let fs = require("fs");

let router = express.Router();

router.post("/save", async (req, res) => {
    try {
      let body = req.body;
      let user = new User();
  
      if (body.data.id != "") {
        user = await User.findById(body.data.id);
      }
      user.roleid = body.data.roleid;
      user.name = body.data.name;
      user.email = body.data.email;
      user.password = body.data.password;

      user.save().then(
        (results) => {
          res.end(JSON.stringify({ status: "success", data: results }));
        },
        (err) => {
          res.end(JSON.stringify({ status: "failed", data: err }));
        }
      );
    } catch(ex) {
      console.log(ex);
      res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
  });

  router.post("/list", async (req, res) => {
    try {
      let users = await User.find().populate({path:"roleid", select:['name']});
      res.end(JSON.stringify({ status: "success", data: users }));     
    } catch {
      res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
  });

  router.post("/get", async (req, res) => {
    try {
      let body = req.body;
      let user = await User.findById(body.data.id);
      res.end(JSON.stringify({ status: "success", data: user }));
    } catch {
      res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
  });
  
  router.post("/delete", async (req, res) => {
    try {
      let body = req.body;
      await User.findByIdAndDelete(body.data.id);
      res.end(JSON.stringify({ status: "success" }));
    } catch {
      res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
  });

  router.post("/login", async (req, res) => {
    try {
      let body = req.body;
      let user = await User.find({'email':body.data.email, 'password':body.data.password}).populate({path:"roleid"});;
      if(user.length == 0)
        res.end(JSON.stringify({ status: "failed", data: "Not found" }));
      else{
        res.end(JSON.stringify({ status: "success", data: user }));
      }
    } catch {
      res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
  });

  module.exports = router;