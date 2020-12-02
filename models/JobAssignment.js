const keystone = require('keystone');
const Types = keystone.Field.Types;

const JobAssignment = new keystone.List('JobAssignment',{
    track:true,
    noedit:false,
    nodelete:false,
    drilldown:"job, user"
});

JobAssignment.add({
    job: {type: Types.Relationship, ref: 'Jobs', required:true, initial:true},
    user:{type: Types.Relationship, ref: 'User',initial:true},
    inTime: {type: Types.Datetime, label: 'In Time',initial:true},
    exitTime: {type: Types.Datetime, label: 'Exit Time', initial:true},
    rating: {type: Types.Number,initial:true},
    approved:{type:Types.Boolean,initial:true}
});

JobAssignment.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

JobAssignment.defaultColumns = 'user, job';
JobAssignment.register();
