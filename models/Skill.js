const keystone = require('keystone');
const Types = keystone.Field.Types;

const Skill = new keystone.List('Skill',{
    track:true,
    noedit:false,
    nodelete:false,
});

Skill.add({
    skill: {type: Types.Text, required: true, index: true, initial: true},
    skillId: {type: Types.Number},

});

Skill.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Skill.defaultColumns = 'skill';
Skill.register();
