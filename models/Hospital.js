const keystone = require('keystone');
const Types = keystone.Field.Types;

const Hospital = new keystone.List('Hospital',{
    track:true,
    noedit:false,
    nodelete:false,
    drilldown:"departments"
});

Hospital.add({
    name: {type: Types.Text, required: true, index: true, initial: true, label: 'Hospital Name'},
    //key for identifying if the hospital is verified or not
    address: {type: Types.TextArray},
    location: {type: Types.Text}, // lat long
    departments: {type: Types.Relationship, ref: 'Department', many:true, initial: true},
});

Hospital.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Hospital.defaultColumns = 'name, departments';
Hospital.register();
