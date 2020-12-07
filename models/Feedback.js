const keystone = require('keystone');
const Types = keystone.Field.Types;

const Feedback = new keystone.List('Feedback',{
    track:true,
    noedit:false,
    nodelete:false,
    // drilldown:"user"
});

Feedback.add({
    user: {type:Types.Relationship, initial:true, ref:"User",label:"Nurse"},
    email: {type: Types.Text},
    subject: {type: Types.Text},
    message: {type: Types.Text}

});

Feedback.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Feedback.defaultColumns = 'user, email';
Feedback.register();
