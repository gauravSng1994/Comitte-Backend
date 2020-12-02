const keystone = require('keystone');
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const totp = require('otplib').totp;

// const ObjectId = require("mongoose").Types.ObjectId;
const UserModel = keystone.list('User').model;
const UserRoleModel = keystone.list('UserRole').model;
const sendEmail = require('../../services/email');


const createJWT = (user, res) => {
    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: 360000
        },
        (err, token) => {
            if (err) throw err;
            res.status(200).json({
                token
            });
        }
    );
}

const signup = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         errors: errors.array()
    //     });
    // }

    const {
        name,
        email,
        password,
        phoneNumber,
        role="Nurse",
    } = req.body;
    try {
        let user = await UserModel.findOne({ email });
        console.log('Hello signup',name,email,password,user);
        if (user) return res.status(400).json({
                msg: "User Already Exists"
            });
        const selectedRole = await UserRoleModel.findOne({name:role},{_id:1});
        // find first and last names
        let splitName = name.split(" ");
        let last = splitName.length > 1 ? splitName.pop() : "";
        let first = splitName.join(" ");
        user = new UserModel({
            name:{
                first,
                last
            },
            email,
            password,
            isActive:true
        });
        if(selectedRole) user.role = selectedRole._id;
        await user.save();
        await user.update({$push:{phoneNumbers:phoneNumber}});
        console.log('Created new user',user);
        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: 36000
            },
            (err, token) => {
                if (err) throw err;
                res.cookie('xsrf-token', token, {maxAge: 900000, httpOnly: true});
                res.status(200).json({token})
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
}


const login = async (req,res) => {
    // const errors = validationResult(req);
    // console.log('err', errors)
    // if (!errors.isEmpty()) {
    //     console.log('inside error')
    //     return res.status(400).json({
    //         errors: errors.array()
    //     });
    // }

    const {email, password} = req.body;
    try{
        console.log('LOGIN 1',email,password);
        let user = await UserModel.findOne({ email });
        console.log('LOGIN 2',user);
        if (!user || user.isDeleted) return res.status(400).json({ message: "User Does Not Exist" });
        // compare password and call userFound if found
        user._.password.compare(password, function (err, isMatch) {
            if (err || !isMatch) return res.status(400).json({ message: "Incorrect Email or Password."});
            const payload = {
                user: { id: user._id }
            };
            delete user.password;
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    console.log('token', token)
                    res.status(200).json({
                        token,
                        user
                    });
                }
            );
        });
    }catch (e) {
        return res.status(400).json({ message:"Something went wrong", err:e })
    }
}

const verifyOtp = async (otp) =>{

}
const resetPassword = async (req,res) => {
    // from: '"Fred Foo" <foo@example.com>', // sender address
    // to: "bar@example.com, baz@example.com", // list of receivers
    // subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body
    const {email,phoneNumber} = (req.body || {});
    if(!email && !phoneNumber) return res.status(400).json({message:"Email/mobile number not found", err:"Invalid Request"});
    // const query = email ? {email}
    const user = await UserModel.findOne({email},{_id:1}).lean();
    if(!user) return res.status(400).json({message:"User not found for given details", err:"Wrong Email/mobile number"});
    try {
        // totp.options = { digits: 6 };
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhiklmnopqrstuvwxyz0123456789'.split('');
        let secret = '';
        for(let i=0; i<10; i++){
            let x = Math.floor(Math.random() * chars.length);
            secret += chars[x];
        }
        let token = totp.generate(secret);
        console.log("OTPS",token,totp.verify({token,secret}),totp.verify({token,secret:"1234598721"}));
        await UserModel.update({_id:user._id},{$set:{recentOtp:token}});
        const mailOptions = {
            to: email,
            subject:"Reset password OTP",
            html:
                `<div> <p>This OTP is valid only for 10 minutes</p> <p>To reset your password, please enter this OTP: ${OTP}</p> </div>`
        }
        await sendEmail(mailOptions);
        return res.status(200).json({message:"OTP sent",err:null});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong", err:e})
    }

}
exports = module.exports = {
    login,
    signup,
    resetPassword
}
