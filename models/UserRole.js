var keystone = require('keystone');
var Types = keystone.Field.Types;

var UserRole = new keystone.List('UserRole');

UserRole.add({
  name: { type: String, required: true, initial: true },
 
});

UserRole.schema.virtual('canAccessKeystone').get(function () {
  return true;
});


UserRole.defaultColumns = 'name';
UserRole.register();
