const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

//Login
const loginController = async (req, res) => {
  try {
    //finding user by email
    const user = await userModel.findOne({ email: req.body.email });    
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    //comparing password
    const isMatch =await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    //adding jwt token
    const token = jwt.sign({ id: user._id }, "secrettoken", {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ message: "Login Success", success: true, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in Login" });
  }
};

const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User already registered", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.status(201).send({ message: "Registered  successful", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Failed to create the user", success: false });
  }
};


const authController = async(req,res) => {
  try {
    const user = await userModel.findOne({_id:req.body.userId})
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        user:{
          name: user.name,
          email: user.email       
        },
      });
    }    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:'Auth middleware error',
      success:false,
      error
    })    
  }
}

module.exports = { loginController, registerController, authController };
