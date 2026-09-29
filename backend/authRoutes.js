const express = require("express");
const router = express.Router();
const User = require("./userschema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/users", async (request, response, next) =>{
    try {
        let users = await User.find();
        response.json(users);
        next();
    } catch (error) {
        next(error);
    }
})


router.post("/register", async (request, response, next) => {
    try {
    
        let newUser = new User({
            username: request.body.username,
            password: request.body.password
        })
        
        let savedUser = await newUser.save();
    
    
        response.status(201).json({username: savedUser.username})
    
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (request, response, next) => {
  try {
    let user = await User.findOne({ username: request.body.username });
    
    if (!user) {
      let error = new Error("Invalid username or password");
      error.statusCode = 401;
      return next(error);
    }

    let isMatch = await bcrypt.compare(request.body.password, user.password);

    if (!isMatch) {
      let error = new Error("Invalid username or password");
      error.statusCode = 401;
      return next(error);
    }

    let jwtToken = jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "1h"});
    response.status(200).json({token: jwtToken})
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;