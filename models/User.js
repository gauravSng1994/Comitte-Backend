var keystone = require('keystone');
const Types = keystone.Field.Types;

var User = new keystone.List('User');

User.add({
  name: {type: Types.Name, required: true, index: true, initial: true},
  email: { type: Types.Email, unique: true },
  password: {type: Types.Password},
  phoneNumbers: {type: Types.TextArray},
  photo: {type: Types.Text},
  skills: {type: Types.Relationship, ref: 'Skills', noedit: true},
  gender: {type: Types.Select, options: 'Male, Female, Other'},
  dob: {type: Types.Date, label: 'Date of Birth'},
  highestQualification: {type: Types.Select, options: ['GNM', 'BSC']},
  currentlyWorking: {type: Types.Select, options: ['Yes', 'No']},
  yearOfExp: {type: Types.Select, options: ['1', '2', '3', '4','5+']},
  monthOfExp: {type: Types.Select, options: ['1', '2', '3', '4','5+']},
  currentExperience: {type: Types.Relationship, ref: 'Experience', noedit: true},
});

User.schema.virtual('canAccessKeystone').get(function () {
  return true;
});

User.defaultColumns = 'id, name, email';
User.register();



/**
 * Customer Model
 * ==========
 */
