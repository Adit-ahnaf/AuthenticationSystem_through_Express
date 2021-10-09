const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const testSchema = require("./Schema/testSchema");
const testModel = new mongoose.model("Test", testSchema);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tokenpass = require('../midlewaire/Tokenpass');

router.post("/sighnup", async (req, res) => {
  try {
    const hasshedPassword = await bcrypt.hash(req.body.password, 10);
    const newTest = new testModel({
      username: req.body.username,
      name: req.body.name,
      password: hasshedPassword,
    });
    await newTest.save();
    res.status(200).json({
      message: "sighnup successfull",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "sighnup failed!!",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await testModel.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          { expiresIn : "1h" }
        );
        res.status(200).json({
          access_token: token,
          message: "login successful",
          
        });
        console.log(res);
      } else {
        res.status(401).json({
          error: "Authentication failed",
        });
      }
    }
  } catch (err){
      console.log(err)
    res.status(401).json({
      error: "Authentication failed",
    });
  }
});

router.get('/', Tokenpass ,(req,res)=>{
    console.log('welcome')
    const {username} = Tokenpass;
    console.log(username);
})

module.exports = router;
