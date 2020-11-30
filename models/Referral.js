var keystone = require('keystone');
const Types = keystone.Field.Types;

var Referral = new keystone.List('Referral');

Referral.add({
    referrer: {type: Types.Relationship, ref: 'User',required: true, index: true, initial: true},
    name:{type: Types.Name},
    email: {type: Types.Email},
    mobile: {type: Types.TextArray},
    award: {type: String},
    completed: {type: Types.Boolean},

});

Referral.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Referral.defaultColumns = 'name, email, mobile';
Referral.register();
