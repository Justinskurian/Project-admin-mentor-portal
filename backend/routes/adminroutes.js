const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const adminModel = require("../models/admin");
const mentorModel = require("../models/mentor");

router.use(express.json());

router.post("/login", async (req, res) => {
  try {
<<<<<<< HEAD
    const user = await mentorModel.findOne({ email: req.body.email });
    
    const payload = { email: "admin123@gmail.com", password: "Admin123" };

    if (
      req.body.email == "admin123@gmail.com" &&
      req.body.password == "Admin123"
    ) {
      const token = jwt.sign(payload, "adminMentor");
      console.log(token);
      res.status(200).send({ message: "Login successful", token: token });
    } 
    else if (user.password == req.body.password) {
      res.status(200).send({ message: "Login successful" });
    } 
    else if(!user){
      res.send({message:"user not found"})
    }

     else {
      res.status(404).send({ message: "Invalid credentials"});
=======
    const admin = await adminModel.findOne({ email: req.body.email });

    if (!admin) {
      res.status(201).send({ message: "User not found" });
    }
    else if (
      admin.email==req.body.email &&
      admin.password == req.body.password
    ) {
      const payload = { email: admin.email, password:admin.password};
      const token = jwt.sign(payload, process.env.jwt, { expiresIn: "1h" });
      res.status(200).send({ message: "Login successful", token: token });
>>>>>>> 1eabcbb8ccef03d7970daefed9c5e5e16a805050
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});



 

router.post("/admin/add", async (req, res) => {
  try {
    var item2 = req.body;

    var data2 = new adminModel(item2);
    await data2.save();
    res.status(200).send("data added successfully");
  } catch (error) {
    res.status(404).send("unable to send  data");
    console.log(error);
  }
});

router.post("/mentor/add", async (req, res) => {
  try {
    var item3 = req.body;
    var data3 = new mentorModel(item3);
    await data3.save();
    res.status(200).send("data added successfully");
  } catch (error) {
    res.status(404).send("unable to send  data");
  }
});

router.delete("/mentor/del/:id", async (req, res) => {
  try {
    await mentorModel.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted successfully");
  } catch (error) {
    res.status(404).send("unable to delete data");
  }
});

router.get("/submission/view", async (req, res) => {
  try {
    var data1 = await adminModel.find();
    res.status(200).send(data1);
  } catch (error) {
    res.status(404).send("unable to get data");
  }
});

router.post("/project/add", async (req, res) => {
  try {
    var item1 = req.body;
    var data1 = new adminModel(item1);
    await data1.save();
    res.status(200).send("data added successfully");
  } catch (error) {
    res.status(404).send("unable to send  data");
  }
});

router.delete("/project/del/:id", async (req, res) => {
  try {
    await adminModel.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted successfully");
  } catch (error) {
    res.status(404).send("unable to delete data");
  }
});

module.exports = router;
