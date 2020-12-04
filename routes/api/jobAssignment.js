const keystone = require('keystone');
const UserModel = keystone.list('User').model;
const JobAssignmentModel = keystone.list('JobAssignment').model;
const moment = require('moment');

const listJobOfNurses = async (req,res) => {

    // finished
    // Total Earning, avg rating, Hospital name, Ward Name, Address of hospital, Date and time of service

    // const upcoming = await JobAssignmentModel.find({assignedNurse : req.user._id,jobStartTime: {$gte:moment()}})
    //     .populate('job').populate({path:"job.hospital"});
    const ongoing = await JobAssignmentModel.aggregate([
        { $match: {assignedNurse : req.user._id,jobStartTime: {$lte:new Date()},jobEndTime: { $gte:new Date()} } },
        { $lookup:{ from:'jobs',localField:'job',foreignField:'_id',as:'job'}},
        { $unwind: "$job" },
        { $lookup:{ from:'hospitals',localField:'job.hospital',foreignField:'_id',as:'hospital'}},
        { $unwind: "$hospital" },
    ]);

    const upcoming = await JobAssignmentModel.aggregate([
        { $match: {assignedNurse : req.user._id,jobStartTime: {$gt:new Date()}} },
        { $lookup:{ from:'jobs',localField:'job',foreignField:'_id',as:'job'}},
        { $unwind: "$job" },
        { $lookup:{ from:'hospitals',localField:'job.hospital',foreignField:'_id',as:'hospital'}},
        { $unwind: "$hospital" },
    ]);
    const finished = await JobAssignmentModel.aggregate([
        { $match: {assignedNurse : req.user._id,jobEndTime: {$lt:new Date()}} },
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
    console.log('jobs',finished)
    res.status(200).json({ongoing,upcoming,finished});
}

exports = module.exports = {
    listJobOfNurses
}
