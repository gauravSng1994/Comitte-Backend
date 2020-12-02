var keystone = require('keystone');
const Types = keystone.Field.Types;

var User = new keystone.List('User',{
  noedit: false,
  nodelete:false,
  track: true,
  drilldown: 'role',
  rowButtonsDynamic: [
    {
      name: 'Active',
      color: '#991100',
      // icon: 'fa fa-phone',
      // fn: '_call',
      // id: 'c_send_to_printer',
      width: '125px',
      // val: `(row) => (row.fields.sharedWithPrinterOn ? (row.fields.trackingNumber ? row.fields.welcomePackStatus : 'Kit Awaited') : '_button_')`,
      visible: `(row) => (row ? row.fields.isActive : "")`
    }
  ]
});

User.add({
  name: {type: Types.Name, required: true, index: true, initial: true},
  email: { type: Types.Email, unique: true,required:true,initial:true },
  password: {type: Types.Password,required:true,initial:true},
  phoneNumbers: {type: Types.TextArray},
  lastLoggedIn: {type: Types.Datetime},
  isActive:{type: Types.Boolean},
  isDeleted:{type: Types.Boolean},
  avatar: {type: String},
  // location: {type: Types.GeoPoint},
  address: {type: Types.Location, defaults: {country: 'INDIA'} },
  skills: {type: Types.Relationship, ref: 'Skills', many:true},
  gender: {type: Types.Select, options: 'MALE, FEMALE, OTHER'},
  dob: {type: Types.Date, label: 'Date of Birth'},
  experienceInYears: {type: Types.Select, options: ['1', '2', '3', '4','5+']},
  experienceInMonths: {type: Types.Select, options: ['1', '2', '3', '4','5','6','7','8','9','10','11','12']},
  highestQualification: {type: Types.Select, options: ['GNM', 'BSC']},
  currentlyWorking: {type: Types.Select, options: ['YES', 'NO']},
  jobDetails: {type: Types.Relationship, ref: 'Experience', many:true},
  nursingDegree: {type: String}, //to be modified to S3Storage
  aadharCard: {type: String}, //to be modified to S3Storage
  panCard: {type: String}, //to be modified to S3Storage
  lastWorkExperienceCertificate: {type: String}, //to be modified to S3Storage
  lastSalarySlip: {type: String}, //to be modified to S3Storage
  marksheet: {type: String}, //to be modified to S3Storage
  availabilityOfwork:{type: Types.Datetime}
},'Permissions',{
  role:{type: Types.Relationship, ref: 'UserRole', noedit: true,initial:true, required:false},
  isAdmin: {type: Boolean, label: 'Can access Admin', initial: true, index: true, default: true},
  recentOtp:{type:String}
});
User.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});

User.defaultColumns = 'name, email, role phoneNumbers';
User.register();

// User.model.schema.pre('save',async (next)=>{
//   console.log(this);
//   next();
// })


/**
 * Customer Model
 * ==========
 */
