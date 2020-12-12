/**
 * Committee Model
 * ==========
 */

const keystone = require('keystone');
const Types = keystone.Field.Types;

const Committee = new keystone.List('Committee',{
  noedit: false,
  nodelete:false,
  track: true,
  drilldown: 'participants'
});

Committee.add({
  name: {type: String, required: true, index: true, initial: true},
  avatar: {type: String},
  participants: {type:Types.Relationship, ref:"User",many:true,initial:true},
  description: {type:String},
  amount: {type:Number},
  admins:{type:Types.Relationship, ref:"User",many:true},
  bidMultipleAmount:{type:Number},
  bidBaseAmount:{type:Number},
  bidTime:{type:Number},
  isActive:{type: Types.Boolean},
  isDeleted:{type: Types.Boolean},
});

Committee.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});

Committee.schema.pre('save', async function (next){
  next();
})

Committee.defaultColumns = 'name, description, participants';
Committee.register();
