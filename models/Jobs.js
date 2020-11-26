var keystone = require('keystone');
const Types = keystone.Field.Types;

var Jobs = new keystone.List('Jobs');

Jobs.add({
    cost: {type: Types.Text, required: true, index: true, initial: true, label: 'Job Title'},
    address: {type: Types.TextArray},
    department: {type: Types.Text},
    location: {type: Types.Text},
    startDate: {type: Types.Date, label: 'Date Of Joining'},
});

Jobs.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Jobs.defaultColumns = 'cost, startDate';
Jobs.register();
