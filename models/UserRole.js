var keystone = require('keystone');
var Types = keystone.Field.Types;

var UserRole = new keystone.List('UserRole',{
  noedit:false,
  track:true
});

UserRole.add({
  roleId: { type: Types.Number, required: true, initial: true, unique:true },
  roleType: { type: Types.Select,options:["NURSE","ADMIN","RECRUITER"], required: true, initial: true,unique: true },

});

UserRole.schema.virtual('canAccessKeystone').get(function () {
  return true;
});


UserRole.defaultColumns = 'roleId, roleType, createdAt, updatedAt';
UserRole.register();
