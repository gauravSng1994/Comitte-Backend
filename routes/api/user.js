const keystone = require('keystone');
const UserModel = keystone.list('User').model;
const utilService = require('../../services/utils');
async function getUser(req, res) {
    try{
        let user = await UserModel.findOne({_id: req.user._id},{password:0}).lean();
        console.log('user',user)
        return res.status(200).json({user});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}
async function getUserFromEmailPhone(req, res) {
    try{
        const {emailMobile} = req.params;
        const query = {};
        if(utilService.validateEmail(emailMobile)) query.email=emailMobile;
        else query.phoneNumber=emailMobile;
        let user = await UserModel.findOne(query,{password:0}).lean();
        return res.status(200).json({user});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}
const updateUser = async (req,res) => {
    let userId = req.user._id;
    try {
        let data = {...(req.body||{})};
        for(const el in data) if(!data[el] && data[el]!==false) delete data[el];
        await UserModel.findOneAndUpdate({_id:userId},data);
        const updatedUser = await UserModel.findOne({_id:userId}).populate('skill');
        return res.status(200).json({msg:"User updated successfully",data:updatedUser});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}
exports = module.exports = {
    getUser,
    updateUser,
    getUserFromEmailPhone
}
