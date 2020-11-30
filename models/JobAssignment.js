var keystone = require('keystone');
const Types = keystone.Field.Types;

var JobAssignment = new keystone.List('JobAssignment');

JobAssignment.add({
    job: {type: Types.Relationship, ref: 'Jobs', required:true, initial:true},
    user:{type: Types.Relationship, ref: 'User', many:true},
    inTime: {type: Types.Datetime, label: 'In Time'},
    exitTime: {type: Types.Datetime, label: 'Exit Time'},
    rating: {type: Types.Number},

});

JobAssignment.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

JobAssignment.defaultColumns = 'user, job';
JobAssignment.register();
