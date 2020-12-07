const {findOngoingJobs,findUpcomingJobs,findFinishedJobs } = require('../../services/JobAssignment');

const listJobOfNurses = async (req,res) => {
    const jobs = {};
    const { category } = req.query;
    if(!category || category === 'ongoing') jobs.ongoing = await findOngoingJobs(req.user);
    if(!category || category === 'upcoming') jobs.upcoming = await findUpcomingJobs(req.user);
    if(!category || category === 'finished') jobs.finished = await findFinishedJobs(req.user);
    res.status(200).json(jobs);
}

exports = module.exports = {
    listJobOfNurses
}
