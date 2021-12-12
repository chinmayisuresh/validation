//crud users
const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const { body, validationResult } = require('express-validator');



router.post("/" , 
body("first_name").notEmpty(),
body("last_name").notEmpty(),
body('gender').custom(value=>{if(value=='female'||value=='male'||value=='others'){
                                         return true;
                                             }
else{
    throw Error("please enter valid");
}
}),
    
body("pincode").isLength(6),
body("age").custom(value=>{if(value<1||value>100){throw Error("please enter valid")}return true;}),
body("email").isEmail()
,async (req,res) =>{
    console.log(body("gender"));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    const user = await User.create(req.body);
    return res.status(200).send(user);
    }catch(e){
        return res.send(e.message);
    }
})

router.get("/",async(req,res)=>{
    try{
        const user=await User.find();
        return res.status(200).send(user);
    }
    catch(e){
        return res.send(e.message);
    }
    
})

module.exports = router;