const keystone = require('keystone');
const Types = keystone.Field.Types;

const Experience = new keystone.List('Experience',{
    track:true,
    drilldown:"user hospital"
});


Experience.add({
    user: {type:Types.Relationship, initial:true, ref:"User",label:"Nurse"},
    title: {type: Types.Text, required: true, index: true, initial: true, label: 'Job Title'},
    hospital: {type: Types.Relationship, ref:"Hospital", required: true, index: true, initial: true},
    currentlyWorkingHere: {type: Types.Select, options: ['YES', 'NO']},
    startDate: {type: Types.Date, label: 'Start Date'},
    endDate: {type: Types.Date, label: 'End Date'},
});

Experience.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Experience.defaultColumns = 'user, title, hospital, currentlyWorkingHere, startDate, endDate';
Experience.register();
