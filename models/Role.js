const keystone = require('keystone');
const Types = keystone.Field.Types;

const Role = new keystone.List('Role',{
  noedit:false,
  track:true,
});

Role.add({
  roleId: { type: Types.Number, required: true, initial: true, unique:true },
  roleName: { type: Types.Select,options:["USER","ADMIN","SUPER_ADMIN"], required: true, initial: true,unique: true },
});

Role.schema.virtual('canAccessKeystone').get(function () {
  return true;
});


Role.defaultColumns = 'roleId, roleType, createdAt, updatedAt';
Role.register();
