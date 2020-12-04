const keystone = require('keystone');
const Department = keystone.list('Department').model;

const listDepartments = async (req,res) => {
    try{
        let departments = await Department.find({ });
        console.log('Listing Departments...',departments);
        return res.status(200).json({departments});
    }catch (e) {
        return res.status(400).json({message:"Something went wrong.",err:e});
    }
}
exports = module.exports = {
    listDepartments
}
