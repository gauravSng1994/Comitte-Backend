const listJobs =  (req,res) => {
    console.log('Listing jobs...');
    res.status(200).json({msg:"all jobs list"});
}
exports = module.exports = {
    listJobs
}
