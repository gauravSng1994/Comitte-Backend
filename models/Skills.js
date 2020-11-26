var keystone = require('keystone');
const Types = keystone.Field.Types;

var Skills = new keystone.List('Skills');

Skills.add({
    title: {type: Types.Text, required: true, index: true, initial: true},

});

Skills.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Skills.defaultColumns = 'title, hospitalName';
Skills.register();
