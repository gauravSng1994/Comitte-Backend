const keystone = require('keystone');
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
// const ObjectId = require("mongoose").Types.ObjectId;
const UserModel = keystone.list('User').model;
const UserRoleModel = keystone.list('UserRole').model;



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
        let user = await UserModel.findOne({
            email
        });
        if (!user || user.isDeleted){
            return res.status(400).json({
                message: "User Does Not Exist"
            });
        }else{
            // compare password and call userFound if found
            user._.password.compare(password, function (err, isMatch) {
                if (!err && isMatch) {
                    const payload = {
                        user: {
                            id: user._id
                        }
                    };
                    console.log('ENV',process.env.JWT_SECRET);
                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {
                            expiresIn: 360000
                        },
                        (err, token) => {
                            if (err) throw err;
                            // console.log('token', token)
                            res.status(200).json({
                                token
                            });
                        }
                    );
                } else {
                    return res.status(400).json({
                        message: "Incorrect Email or Password."
                    });
                }
            })
        }
    }catch (e) {
        return res.status(400).json({
            message:"Something went wrong",
            err:e
        })
    }
}

exports = module.exports = {
    login,
    signup
}
