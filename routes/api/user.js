const keystone = require('keystone');
const UserModel = keystone.list('User').model;
const UserRoleModel = keystone.list('UserRole').model;
const {getPreSignedURL} = require('../../services/utils');
async function getUser(req, res) {
    try{
        let user = await UserModel.findOne({_id: req.user._id}).lean();
        console.log('user',user)
        return res.status(200).json({user});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}

async function listNurses(req, res) {
    try{
        let nurseRole = await UserRoleModel.findOne({name:"NURSE"}).lean();
        let nurses = await UserModel.find({role: nurseRole._id}).lean();
        return res.status(200).json({data:nurses});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}

const updateUser = async (req,res) => {
    let userId = req.user._id;
    try {
        let data = {...(req.body||{})};
        for(const el in data) if(!data[el] || data[el]==="null") delete data[el];
        await UserModel.findOneAndUpdate({_id:userId},data);
        const updatedUser = await UserModel.findOne({_id:userId}).populate('skill');
        console.log('updated user',updatedUser);
        return res.status(200).json({msg:"User updated successfully",data:updatedUser});
        //     gender,
        //     dob,
        //     skills, // TODO ask skills vs departments
        //     experienceInYears,
        //     experienceInMonths,
        //     highestQualification, // BSC or else
        //     currentlyWorking, // YES, NO
        //     workExperiences, // array, ref to Experience
        //     nursingDegree, // upload
        //     aadharCard, // upload
        //     panCard, // upload
        //     lastWorkExperienceCertificate, // upload
        //     lastSalarySlip, // upload
        //     marksheet, // upload
        //     avatar, // photograph, upload
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}

const getUploadDocumentsPreSignedUrls = async (req,res) => {
    const data = req.body;
    console.log('DATA',data);
    const urls = {};
    for(const el in data) if(data.hasOwnProperty(el)) urls[el] = await getPreSignedURL(data[el]);
    return res.status(200).json(urls);
}

exports = module.exports = {
    getUser,
    updateUser,
    listNurses,
    getUploadDocumentsPreSignedUrls,
}
