var keystone = require('keystone');
var Types = keystone.Field.Types;

var UserRole = new keystone.List('UserRole');

UserRole.add({
  roleId: { type: Types.Number, required: true, initial: true, unique:true },
  roleType: { type: Types.Text, required: true, initial: true },

});

UserRole.schema.virtual('canAccessKeystone').get(function () {
  return true;
});


UserRole.defaultColumns = 'id, roleType';
UserRole.register();
