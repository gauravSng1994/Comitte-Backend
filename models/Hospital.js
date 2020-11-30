var keystone = require('keystone');
const Types = keystone.Field.Types;

var Hospital = new keystone.List('Hospital');

Hospital.add({
    name: {type: Types.Text, required: true, index: true, initial: true, label: 'Hospital Name'},
    address: {type: Types.TextArray},
    location: {type: Types.Text},
    departments: {type: Types.Relationship, ref: 'Departments', many:true},
});

Hospital.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Hospital.defaultColumns = 'name, departments';
Hospital.register();
