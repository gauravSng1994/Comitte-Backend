const keystone = require('keystone');
const UserModel = keystone.list('User').model;

const update =  (req,res) => {
    console.log('Update user body',req.body);

    const {
        experienceInYears,
        experienceInMonths,
        highestQualification,
        currentlyWorking,
        workExperiences, // array, ref to Experience
        nursingDegree, // upload
        aadharCard, // upload
        panCard, // upload
        lastWorkExperienceCertificate, // upload
        lastSalarySlip, // upload
        marksheet, // upload
        avatar, // photograph, upload

    } = req.body;
    res.status(200).json({msg:"Great Job"});
}
exports = module.exports = {
    update
}
