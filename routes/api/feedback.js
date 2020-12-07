const Feedback = require('keystone').list('Feedback').model;
const createFeedback = async (req,res) => {
    try{
        const {email,subject,message} = req.body;
        const feedback = new Feedback({
            user:req.user._id,
            email,
            subject,
            message
        })
        await feedback.save()
        return res.status(200).json({msg:"Feedback created",err:null});
    }catch (e) {
        console.log(e)
        return res.status(400).json({msg:"Something went wrong",err:e});
    }
}
exports = module.exports = {
    createFeedback
}
