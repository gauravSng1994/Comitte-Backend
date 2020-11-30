var keystone = require('keystone');
const Types = keystone.Field.Types;

var Skills = new keystone.List('Skills');

Skills.add({
    skills: {type: Types.Text, required: true, index: true, initial: true},
    skillId: {type: Types.Number},

});

Skills.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Skills.defaultColumns = 'skills';
Skills.register();
