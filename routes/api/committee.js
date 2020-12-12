const keystone = require('keystone');
const CommitteeModel = keystone.list('Committee').model;

async function listCommittee(req, res) {
    try{
        let userId = req.user._id;
        let committee = await CommitteeModel.find({_id: req.user._id}).lean();
        return res.status(200).json({user});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}

const createCommittee = async (req,res) => {
    let userId = req.user._id;
    try {
        let data = {...(req.body||{})};
        for(const el in data) if(!data[el] && data[el]!==false) delete data[el];
        const committee = new CommitteeModel({
            ...data,
            createdBy:userId,
            admins:[userId]
        });
        await committee.save();
        return res.status(200).json({msg:"Committee updated successfully",data:committee});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}

const deleteCommittee = async (req,res) => {
    let userId = req.user._id;
    const {id} = req.params
    console.log('committee id',id);
    try {
        // const com = CommitteeModel.findOne({_id:id});
        const committee = await CommitteeModel.findOne({_id:id});
        const userIsAdmin = committee.admins.some(el=>el.equals(userId));
        console.log('isAdmin',userIsAdmin);
        if(!userIsAdmin) return res.status(400).json({msg:"Unauthorized User"});
        await CommitteeModel.update({_id:id},{$set:{isDeleted:true}});
        return res.status(200).json({msg:"Committee deleted successfully"});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}

// const updateUser = async (req,res) => {
//     let userId = req.user._id;
//     try {
//         let data = {...(req.body||{})};
//         for(const el in data) if(!data[el] && data[el]!==false) delete data[el];
//         await UserModel.findOneAndUpdate({_id:userId},data);
//         const updatedUser = await UserModel.findOne({_id:userId}).populate('skill');
//         return res.status(200).json({msg:"User updated successfully",data:updatedUser});
//     }catch (e) {
//         return res.status(400).json({message:"Something went wrong.",err:e});
//     }
// }
exports = module.exports = {
    // getUser,
    // updateUser,
    createCommittee,
    deleteCommittee
}
