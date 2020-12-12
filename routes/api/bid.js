const keystone = require('keystone');
const BidModel = keystone.list('Bid').model;
const ObjectId = require('mongoose').Types.ObjectId

async function listBids(req, res) {
    try{
        let userId = ObjectId(req.user._id);
        const {committee} = req.params;
        let bid = await BidModel.find({committee});
        return res.status(200).json({data:bid});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}

const createBid = async (req,res) => {
    let userId = req.user._id;
    try {
        let {committee,amount,bidder} = {...(req.body||{})};
        if(!committee || !amount || !bidder) return res.status(400).json({message:"Required properties missing"});
        const bid = new BidModel({
            committee,
            amount,
            bidder,
            createdBy:userId,
        });
        await committee.save();
        return res.status(200).json({msg:"Committee updated successfully",data:committee});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}

exports = module.exports = {
    // getUser,
    // updateUser,
    listBids,
    createBid,
}
