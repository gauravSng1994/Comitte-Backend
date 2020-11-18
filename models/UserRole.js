var keystone = require('keystone');

var UserRole = new keystone.List('UserRole');

UserRole.add({
  displayName: {type: String },
  email: { type: keystone.Field.Types.Email, unique: true },
  password: { type: keystone.Field.Types.Password },
});

UserRole.schema.virtual('canAccessKeystone').get(function () {
  return true;
});

UserRole.defaultColumns = 'id, displayName, email';
UserRole.register();