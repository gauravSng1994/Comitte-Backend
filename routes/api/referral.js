const ReferralModel = require('keystone').list('Referral').model;
const createReferral = async (req,res) => {
    try{
        const {name,email,mobile} = req.body;
        let splitName = name.split(" ");
        let last = splitName.length > 1 ? splitName.pop() : "";
        let first = splitName.join(" ");
        const referral = new ReferralModel({
            referrer:req.user._id,
            name:{first,last},
            email,
            mobile,
            consumed: false,
        })
        await referral.save()
        return res.status(200).json({msg:"Referral created",err:null});
    }catch (e) {
        return res.status(400).json({msg:"Something went wrong",err:e});
    }
}
exports = module.exports = {
    createReferral
}
