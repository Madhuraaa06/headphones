const express = require('express');
const router = express.Router();
const User = require("../user")
const { body, validationResult } = require('express-validator');
const { hashPass, comparePassword } = require('../helper/hashpass');
const { findOne } = require('../item');

router.post("/register", [
  body('name', 'Please fill this field').notEmpty(),
  body('name', 'Minimum length must be 3').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Five characters needed').isLength({ min: 5 }),
], async (req, res) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let exuser = await User.findOne({ email });
    if (exuser) {
      return res.status(200).json({
        success: false,
        message: "User already exists!"
      });
    }

    const hashedpassword = await hashPass(password);

    const user = new User({ name, email, password: hashedpassword });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      hashedpassword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error
    });
  }
});

router.post('/login',[
    body('email','enter a email').isEmail(),
    body('password','five characters needed').isLength({min:5})],
    async(req,res)=>{


        const errors = validationResult (req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
   }

   const{ email, password} = req.body;

   try {
    let user = await User.findOne({email});
    if(!user){
        return res.status(202).send({
            success:false,
            message:"Invalid credentials!!"
        })
        }
        const checkp = comparePassword(password,user.password)
        if(!checkp){
            return res.status(400).send({
                success:false,
                message:"Invalid credentials!!"
            })
    }

    res.status(201).json({
        success: true,
        message: 'User logged in successfully',
        
      });
    
   } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error
    });
}

  })


module.exports = router;