const keystone = require('keystone');
const Types = keystone.Field.Types;

const Referral = new keystone.List('Referral',{
    track:true,
    noedit:false,
    nodelete:false
});

Referral.add({
    referrer: {type: Types.Relationship, ref: 'User',required: true, index: true, initial: true},
    name:{type: Types.Name},
    email: {type: Types.Email},
    mobile: {type: Types.TextArray},
    award: {type: String},
    consumed: {type: Types.Boolean},
});

Referral.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Referral.defaultColumns = 'referrer, name, email, mobile, award, consumed';
Referral.register();
