const mongoose = require('mongoose')
const CalendarSchema = new mongoose.Schema({
    date:Date,
    eventName:String
});
CalendarSchema.statics.creates = async function(data){
    const cal  = new Calendar(data);
    return await cal.save()
}
CalendarSchema.statics.update = async function(id,data){
    return await Calendar.updateOne({
        _id:id
    },
    data
    )
}
CalendarSchema.statics.delete = async function(id){
    return await Calendar.deleteOne({ _id: id });
}
CalendarSchema.statics.getData = async function(){
    return await Calendar.find();
}
const Calendar  = mongoose.model('calendar',CalendarSchema)
module.exports = Calendar;