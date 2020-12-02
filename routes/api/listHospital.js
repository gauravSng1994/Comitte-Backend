const keystone = require('keystone');
const Hospitals = keystone.list('Hospital').model;

const listHospitals = async (req,res) => {
    let hospitals = await Hospitals.find({ });
    console.log('Listing Hospitals...',hospitals);
    if(hospitals) res.status(200).json({msg:"all hospitals listed"});
    else return res.status(400)
}
exports = module.exports = {
    listHospitals
}
