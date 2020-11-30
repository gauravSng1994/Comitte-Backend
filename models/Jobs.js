var keystone = require('keystone');
const Types = keystone.Field.Types;

var Jobs = new keystone.List('Jobs');

Jobs.add({
    jobId: {type: String},
    name:{type: String},
    shift: {type: Types.Select, options: ['Morning', 'Evening']},
    cost: {type: Types.Text, required: true, index: true, initial: true},
    startDate: {type: Types.Datetime, label: 'Date Of Joining'},
    endDate: {type: Types.Datetime},
    hospital: {type: Types.Relationship, ref: 'Hospital'},
    department: {type: Types.Relationship, ref: 'Departments'},

});

Jobs.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Jobs.defaultColumns = 'name, jobId, cost';
Jobs.register();
