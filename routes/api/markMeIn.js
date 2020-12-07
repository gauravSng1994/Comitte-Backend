const markMeIn = async (req,res) => {
    const jobs = {};
    const { type } = req.query;
    if(!type || type === 'in') jobs.ongoing = await findOngoingJobs(req.user);
    if(!type || type === 'out') jobs.upcoming = await findUpcomingJobs(req.user);
    res.status(200).json(jobs);
}

exports = module.exports = {
    markMeIn
}
