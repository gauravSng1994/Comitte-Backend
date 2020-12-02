const keystone = require('keystone');
const Types = keystone.Field.Types;

const Jobs = new keystone.List('Jobs',{
    track:true,
    noedit:false,
    nodelete:false,
    drilldown:"hospital, department"
});

Jobs.add({
    jobId: {type: String},
    name:{type: String,initial:true},
    shift: {type: Types.Select, options: ['Morning', 'Evening'],initial:true},
    cost: {type: Types.Text, required: true, index: true, initial: true},
    startDate: {type: Types.Datetime, label: 'Date Of Joining',initial:true},
    endDate: {type: Types.Datetime,initial:true},
    hospital: {type: Types.Relationship, ref: 'Hospital',initial:true},
    department: {type: Types.Relationship, ref: 'Department',initial:true, watch: "hospital", value:function (callback){
        console.log(this);
        callback(null,"L");
        }},
});

Jobs.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Jobs.defaultColumns = 'name, jobId, cost';
Jobs.register();
