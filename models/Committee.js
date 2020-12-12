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
  name: {type: Types.Name, required: true, index: true, initial: true},
  avatar: {type: String},
  participants: {type:Types.Relationship, ref:"User",many:true,initial:true},
  description: {type:String},
  isActive:{type: Types.Boolean},
  isDeleted:{type: Types.Boolean},
});

Committee.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});

Committee.schema.pre('save', async function (next){
  if(!this.userName) this.userName = await assignUserName();
  next();
})

Committee.defaultColumns = 'name, description, participants';
Committee.register();
