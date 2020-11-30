var keystone = require('keystone');
const Types = keystone.Field.Types;

var User = new keystone.List('User');

User.add({
  name: {type: Types.Name, required: true, index: true, initial: true},
  email: { type: Types.Email, unique: true },
  password: {type: Types.Password},
  phoneNumbers: {type: Types.TextArray},
  lastLoggedIn: {type: Types.Datetime},
  isActive:{type: Types.Boolean},
  isDeleted:{type: Types.Boolean},
  role:{type: Types.Relationship, ref: 'UserRole', noedit: true},
  avatar: {type: String},
  // location: {type: Types.GeoPoint},
  address: {type: Types.Location, defaults: {country: 'India'} },
  skills: {type: Types.Relationship, ref: 'Skills', many:true},
  gender: {type: Types.Select, options: 'Male, Female, Other'},
  dob: {type: Types.Date, label: 'Date of Birth'},
  highestQualification: {type: Types.Select, options: ['GNM', 'BSC']},
  currentlyWorking: {type: Types.Select, options: ['Yes', 'No']},
  yearOfExp: {type: Types.Select, options: ['1', '2', '3', '4','5+']},
  monthOfExp: {type: Types.Select, options: ['1', '2', '3', '4','5+']},
  jobDetails: {type: Types.Relationship, ref: 'Experience', many:true},
  nursingDegree: {type: String}, //to be modified to S3Storage
  aadharCard: {type: String}, //to be modified to S3Storage
  panCard: {type: String}, //to be modified to S3Storage
  lastWorkExperienceCertificate: {type: String}, //to be modified to S3Storage
  lastSalarySlip: {type: String}, //to be modified to S3Storage
  marksheets: {type: String}, //to be modified to S3Storage
  availabilityOfwork:{type: Types.Datetime}
});

User.schema.virtual('canAccessKeystone').get(function () {
  return true;
});

User.defaultColumns = 'name, email, skills';
User.register();



/**
 * Customer Model
 * ==========
 */
