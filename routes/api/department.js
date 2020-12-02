const keystone = require('keystone');
const Departments = keystone.list('Departments').model;

const listDepartments = async (req,res) => {
    let departments = await Departments.find({ });
    console.log('Listing Departments...',departments);
    if(departments) res.status(200).json({msg:"all departments listed"});
    else return res.status(400)
}
exports = module.exports = {
    listDepartments
}
