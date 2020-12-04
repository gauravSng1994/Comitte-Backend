const keystone = require('keystone');
const Departments = keystone.list('Departments').model;

const listDepartments = async (req,res) => {
    try{
        let departments = await Departments.find({ });
        console.log('Listing Departments...',departments);
        return res.status(200).json({departments});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}
exports = module.exports = {
    listDepartments
}
