const keystone = require('keystone');
const Department = keystone.list('Department').model;

const listDepartments = async (req,res) => {
    let departments = await Department.find({ });
    console.log('Listing Departments...',departments);
    if(departments) res.status(200).json({msg:"all departments listed"});
    else return res.status(400)
}
exports = module.exports = {
    listDepartments
}
