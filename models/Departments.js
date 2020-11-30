var keystone = require('keystone');
const Types = keystone.Field.Types;

var Departments = new keystone.List('Departments');

Departments.add({
    name: {type: String, required: true, index: true, initial: true},

});

Departments.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Departments.defaultColumns = 'name';
Departments.register();
