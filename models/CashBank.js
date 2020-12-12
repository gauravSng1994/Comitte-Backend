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
    drilldown: 'participants'
});

CashBank.add({
    title:          { type: Types.Text, isRequired: true },
    accountNumber:  { type: Types.Text, isRequired: false },
    IFSC:           { type: Types.Text, isRequired: false },
    createdBy:      { type: Types.Relationship, ref: 'User.bankAccounts', isRequired: true },
    createdAt:      { type: Types.DateTime, format: 'mm/dd/yyyy h:mm', defaultValue: () => new Date().toISOString() },
    isHandCash:     { type: Types.Boolean, defaultValue: false },
    currentBalance: { type: Types.Integer, defaultValue: 0 },
});

CashBank.schema.virtual('canAccessKeystone').get(function () {
    return this.isAdmin;
});

CashBank.schema.pre('save', async function (next){
    if(!this.userName) this.userName = await assignUserName();
    next();
})

CashBank.defaultColumns = 'name, description, participants';
CashBank.register();
