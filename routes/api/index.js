const demo =  (req,res) => {
    console.log('This is demo function');
    res.status(200).json({msg:"Great Job"});
}
exports = module.exports = {
    demo
}
