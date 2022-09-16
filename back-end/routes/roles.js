let express = require("express");
let bodyparser = require("body-parser");
let Role = require("../models/Roles");
let fs = require("fs");

let router = express.Router();

router.post("/save", async (req, res) => {
  try {
    let body = req.body;
    let role = new Role();

    if (body.data.id != "") {
      role = await Role.findById(body.data.id);
    }
    role.name = body.data.name;
    role.rolepermission = body.data.rolepermission;
    role.userpermission = body.data.userpermission;
    console.log(role);
    role.save().then(
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
    let roles = await Role.find();
    res.end(JSON.stringify({ status: "success", data: roles }));
  } catch {
    res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
  }
});

router.post("/get", async (req, res) => {
  try {
    let body = req.body;
    let role = await Role.findById(body.data.id);
    res.end(JSON.stringify({ status: "success", data: role }));
  } catch {
    res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
  }
});

router.post("/delete", async (req, res) => {
  try {
    let body = req.body;
    await Role.findByIdAndDelete(body.data.id);
    res.end(JSON.stringify({ status: "success" }));
  } catch {
    res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
  }
});

module.exports = router;