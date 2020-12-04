const keystone = require('keystone');
const Types = keystone.Field.Types;

const JobAssignment = new keystone.List('JobAssignment',{
    track:true,
    noedit:false,
    nodelete:false,
    drilldown:"job assignedNurse"
});

JobAssignment.add({
    job: {type: Types.Relationship, ref: 'Jobs', required:true, initial:true},
    shift: {type: Types.Select, options: ['MORNING', 'EVENING', 'NIGHT'],initial:true},
    assignedNurse:{type: Types.Relationship, ref: 'User',initial:true},
    jobStartTime: {type: Types.Datetime, noedit:false}, // TODO noedit:true
    jobEndTime: {type: Types.Datetime,noedit:false}, // TODO noedit:true
    inTime: {type: Types.Datetime, label: 'In Time'},
    exitTime: {type: Types.Datetime, label: 'Exit Time'},
    rating: {type: Types.Number},
    assignmentApproval:{ type:Types.Select, options: ['PENDING', 'APPROVED', 'REJECTED'], default: 'APPROVED', initial:true },
    completionApproval:{ type:Types.Select, options: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
    // life cycle to be discussed
    acceptedByNurse: {type:Types.Boolean, default: false}
});

JobAssignment.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

JobAssignment.defaultColumns = 'assignedNurse job inTime exitTime rating assignmentApproval completionApproval acceptedByNurse';
JobAssignment.register();
