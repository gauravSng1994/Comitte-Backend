var keystone = require('keystone');
const Types = keystone.Field.Types;

var Experience = new keystone.List('Experience');

Experience.add({
    title: {type: Types.Text, required: true, index: true, initial: true, label: 'Job Title'},
    hospitalName: {type: Types.Text, required: true, index: true, initial: true},
    currentlyWorkingHere: {type: Types.Select, options: ['Yes', 'No']},
    startDate: {type: Types.Date, label: 'Start Date'},
    endDate: {type: Types.Date, label: 'End Date'},
});

Experience.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Experience.defaultColumns = 'title, hospitalName';
Experience.register();
