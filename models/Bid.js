/**
 * Bid Model
 * ==========
 */

const keystone = require('keystone');
const Types = keystone.Field.Types;

const Bid = new keystone.List('Bid',{
  noedit: false,
  nodelete:false,
  track: true,
  drilldown: 'participants'
});

Bid.add({
  committee: {type:Types.Relationship, ref:"Committee"},
  amount: {type:Number},
  bidder:{type:Types.Relationship, ref:"User",many:true},
  isDeleted:{type: Types.Boolean},
});

Bid.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});

Bid.schema.pre('save', async function (next){
  next();
})

Bid.defaultColumns = 'name, description, participants';
Bid.register();
