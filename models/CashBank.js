/**
 * CashBank Model
 * ==========
 */

const keystone = require('keystone');
const Types = keystone.Field.Types;

const CashBank = new keystone.List('CashBank',{
    noedit: false,
    nodelete:false,
    track: true,
    drilldown: 'createdBy'
});

CashBank.add({
    title:          { type: Types.Text, isRequired: true },
    accountNumber:  { type: Types.Text, isRequired: false },
    IFSC:           { type: Types.Text, isRequired: false },
    // createdBy:      { type: Types.Relationship, ref: 'User.bankAccounts', isRequired: true },
    isHandCash:     { type: Types.Boolean, defaultValue: false },
    currentBalance: { type: Number, defaultValue: 0 },
});

CashBank.schema.virtual('canAccessKeystone').get(function () {
    return this.isAdmin;
});

CashBank.schema.pre('save', async function (next){
    next();
})

CashBank.defaultColumns = 'name, description, participants';
CashBank.register();
