const keystone = require('keystone');
const JobAssignmentModel = keystone.list('JobAssignment').model;

const findOngoingJobs = async (user)=>{
    return await JobAssignmentModel.aggregate([
        { $match: {assignedNurse : user._id,jobStartTime: {$lte:new Date()},jobEndTime: { $gte:new Date()} } },
        { $lookup:{ from:'jobs',localField:'job',foreignField:'_id',as:'job'}},
        { $unwind: "$job" },
        { $lookup:{ from:'hospitals',localField:'job.hospital',foreignField:'_id',as:'hospital'}},
        { $unwind: "$hospital" },
        { $lookup:{ from:'departments',localField:'job.department',foreignField:'_id',as:'department'}},
        { $unwind: "$department" },
    ]);
}

const findFinishedJobs = async (user)=>{

    // Total Earning, avg rating, Hospital name, Ward Name, Address of hospital, Date and time of service
    return await JobAssignmentModel.aggregate([
        { $match: {assignedNurse : user._id,jobEndTime: {$lt:new Date()}} },
        { $lookup:{ from:'jobs',localField:'job',foreignField:'_id',as:'job'}},
        { $unwind: "$job" },
        { $group: { _id:"$job.hospital", members:{
                    $addToSet: {
                        shift:"$shift",
                        assignedNurse:"$assignedNurse",
                        jobStartTime:"$jobStartTime",
                        jobEndTime:"$jobEndTime",
                        inTime:"$inTime",
                        exitTime:"$exitTime",
                        rating:"$rating",
                        assignmentApproval:"$assignmentApproval",
                        completionApproval:"$completionApproval",
                        acceptedByNurse:"$acceptedByNurse",
                        job:"$job"
                    }
                }, total: { $sum: 1 }, avgRating:{$avg:"$rating"} }  },
        { $lookup:{ from:'hospitals',localField:'_id',foreignField:'_id',as:'hospital'}},
        { $unwind: "$hospital" },
        // { $sort: { $job.startDate: -1 } }
    ]);
}
const findUpcomingJobs = async (user)=>{
    return await JobAssignmentModel.aggregate([
        { $match: {assignedNurse : user._id,jobStartTime: {$gt:new Date()}} },
        { $lookup:{ from:'jobs',localField:'job',foreignField:'_id',as:'job'}},
        { $unwind: "$job" },
        { $lookup:{ from:'hospitals',localField:'job.hospital',foreignField:'_id',as:'hospital'}},
        { $unwind: "$hospital" },
    ]);
}

exports = module.exports = {
    findFinishedJobs,
    findUpcomingJobs,
    findOngoingJobs
}
