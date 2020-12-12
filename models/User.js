/**
 * User Model
 * ==========
 */

const keystone = require('keystone');
const Types = keystone.Field.Types;

const User = new keystone.List('User',{
  noedit: false,
  nodelete:false,
  track: true,
  drilldown: 'role'
});

User.add({
  userName:{type:String}, // this will also behave as referral code
  name: {type: Types.Name, required: true, index: true, initial: true},
  email: { type: Types.Email, unique: true,required:true,initial:true },
  password: {type: Types.Password,required:true,initial:true},
  phoneNumbers: {type: Types.TextArray},// make object isPrimary isVerified
  lastLoggedIn: {type: Number},// epoch time
  isActive:{type: Types.Boolean},
  isDeleted:{type: Types.Boolean},
  avatar: {type: String},
  address: {type: Types.Location, defaults: {country: 'INDIA'} },
  gender: {type: Types.Select, options: 'MALE, FEMALE, OTHER'},
  dob: {type: Types.Date, label: 'Date of Birth'},
  aadharCard: {type: String}, //to be modified to S3Storage
  panCard: {type: String}, //to be modified to S3Storage
  photograph: {type: String}, //to be modified to S3Storage
  bankAccounts:       { type: Types.Relationship, ref: 'CashBank', many: true },
},'Permissions',{
  role:{type: Types.Relationship, ref: 'Role', noedit: true,initial:true, required:false},
  isAdmin: {type: Boolean, label: 'Can access Admin', initial: true, index: true, default: true},
});
User.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});
const generateUserName = (wordLength,numLength)=>{
  let alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const picks = [];
  for (let i = 0; i < wordLength; i++) {
    let key = Math.floor(Math.random()*alphabets.length);
    picks.push(alphabets[key].toUpperCase());
  }
  for(let k = 0; k < numLength; k++) {
    let pin = Math.floor(Math.random()*numbers.length);
    picks.push(numbers[pin]);
  }
  return picks.join("");
}
const assignUserName = async () => {
  let user,newUserName;
  do{
    newUserName = generateUserName(2,4);
    user = await User.model.findOne({userName:newUserName});
  }while(user)
  return newUserName;
}
User.schema.pre('save', async function (next){
  if(!this.userName) this.userName = await assignUserName();
  next();
})

User.defaultColumns = 'name, email, role phoneNumbers';
User.register();
