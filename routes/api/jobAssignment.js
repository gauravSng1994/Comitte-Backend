const JobAssignmentModel = require('keystone').list('JobAssignment').model;
const {findOngoingJobs,findUpcomingJobs,findFinishedJobs } = require('../../services/JobAssignment');


const listJobOfNurses = async (req,res) => {
    const jobs = {};
    const { category } = req.query;
    if(!category || category === 'ongoing') jobs.ongoing = await findOngoingJobs(req.user);
    if(!category || category === 'upcoming') jobs.upcoming = await findUpcomingJobs(req.user);
    if(!category || category === 'finished') jobs.finished = await findFinishedJobs(req.user);
    res.status(200).json(jobs);
}
const setInOutTime = async (req,res) => {
    const jobs = {};
    const { type } = req.query;
    const { jobId } = req.params;
    console.log(type,jobId);
    if(!type || type === 'in') {
        await JobAssignmentModel.update({_id:jobId},{$set:{inTime: new Date(),acceptedByNurse:true}});
    }
    else await JobAssignmentModel.update({_id:jobId},{$set:{exitTime: new Date()}});
    jobs.ongoing = await findOngoingJobs(req.user);
    res.status(200).json(jobs);
}
exports = module.exports = {
    listJobOfNurses,
    setInOutTime
}
