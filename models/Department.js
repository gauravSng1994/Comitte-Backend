const keystone = require('keystone');
const Types = keystone.Field.Types;

const Department = new keystone.List('Department',{
    track:true,
    noedit:false,
    nodelete:false,
});

Department.add({
    name: {type: String, required: true, index: true, initial: true},

});

Department.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Department.defaultColumns = 'name';
Department.register();
