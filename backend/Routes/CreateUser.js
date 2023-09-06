const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

// pasword encrypt
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const jwtSecret = "MyNameIsHetAndWelcomeToMyWebsite";

router.post("/createuser",
    
    // validate
    body('name' , 'Name must be greater than 3 characters').isLength({ min: 3 }),
    body('email' , 'Invalid Email').isEmail(),
    body('password' , 'Password Length must be greater than 5').isLength({ min: 5 }),
    
    async (req,res)=>{
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success:false, errors:[{"msg" : errors.array()[0].msg}] });
        }

        // password encrypt
        const salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password , salt);

        try{
            await User.create({
                name : req.body.name,
                password: securePassword,
                email: req.body.email,
                location: req.body.location
            })

            res.json({success:true});
        }
        catch(error){
            console.log(error)
            res.json({success:false , errors:[{"msg":"Already a User"}] });
        }
    })

router.post("/loginuser",

    body('email' , 'Invalid Email').isEmail(),
    body('password' , 'Password Length must be greater than 5').isLength({ min: 5 }),
        
    async (req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try{
            let email = req.body.email;
            let userdata = await User.findOne({email});
            
            if(!userdata){
                return res.status(400).json({ errors: [{"msg":"Not Valid Email"}] });
            }

            const pwdCompare = await bcrypt.compare(req.body.password , userdata.password);

            if(!pwdCompare){
                return res.status(400).json({ errors: [{"msg":"Incorrect Password"}] });
            }

            // authToken
            const data = {
                user:{
                    id:userdata.id
                }
            }
            const authToken = jwt.sign(data , jwtSecret)
            res.json({success:true , authToken:authToken});
        }
        catch(error){
            console.log(error)
            res.json({success:false,error:error});
        }
    })

module.exports = router;