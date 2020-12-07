const keystone = require('keystone');
const Types = keystone.Field.Types;
const JobAssignmentModel = keystone.list('JobAssignment').model;
const Jobs = new keystone.List('Jobs',{
    track:true,
    noedit:false,
    nodelete:false,
    drilldown:"hospital department assignedNurses"
});

Jobs.add({
    jobId: {type: String},
    name:{type: String,initial:true,set: (shift) => {
            this._previousShift = this.shift;
            console.log('insidee set name',shift,this.shift)
            return shift;
        }},
    shift: {type: Types.Select, options: ['MORNING', 'EVENING', 'NIGHT'],initial:true,
        set: (shift) => {
            this._previousShift = this.shift;
            console.log('insidee set shift',shift,this.shift)
            return shift;
        }
    },
    cost: {type: Types.Text, required: true, index: true, initial: true},
    // commission:{}
    startDate: {type: Types.Datetime,initial:true},
    endDate: {type: Types.Datetime,initial:true},
    hospital: {type: Types.Relationship, ref: 'Hospital',initial:true},
    department: {type: Types.Relationship, ref: 'Department',initial:true},
    assignedNurses:{type: Types.Relationship, ref: 'User',initial:true, many:true,
        set: function (nurses) {
            console.log('NEW NURSES',nurses);
            console.log('OLD NURSES',this.assignedNurses);
            this._assignedNurses = this.assignedNurses;
            if(nurses.length !== this.assignedNurses.length) this._assignedNursesModified = true;
            else{
                for(const prevNurse of this.assignedNurses)
                    if(!nurses.includes(prevNurse)) {
                        this._assignedNursesModified = true;
                        break;
                    }
            }
            // console.log('insidee set mobile',phoneNumbers,this.phoneNumbers,this._phoneNumberModified)
            return nurses;
        }}
    // department: {type: Types.Relationship, ref: 'Department',initial:true, watch: "hospital", value:function (callback){
    //     console.log(this);
    //     callback(null,"L");
    //     }},
});

Jobs.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

Jobs.schema.pre('save', async function (next){
    console.log('isnew',this.isNew);
    this.wasNew = this.isNew;
    next();
})

Jobs.schema.post('save', async function (){
    if(this.wasNew) await assignJob(this);
    console.log('Changed',this.wasNew);
    // if(!this.userName) assignJob(this);
    // next();
})

Jobs.defaultColumns = 'name, jobId, cost startDate endDate, hospital, department';
Jobs.register();
const assignJob = async (job) => {
    for(nurse of job.assignedNurses){
        const jobAssignment =  new JobAssignmentModel({
            job: job._id,
            shift:job.shift,
            assignedNurse:nurse,
            jobStartTime: job.startDate,
            jobEndTime: job.endDate
        })
        console.log('nurse',jobAssignment);
        await jobAssignment.save();
    }
}
