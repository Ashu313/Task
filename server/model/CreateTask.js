const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

const Schema=mongoose.Schema;
const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
   required:true,
  },
  period: {
    type: String,
    required: true,
   
  },
  periodType: {
    type: String,
    required: true,
   
  },
  tasklistID: {
    type: Schema.Types.ObjectId,
    ref: 'TaskList',
    required: true
  },
},
{
timestamps:true,
}
);
taskSchema.plugin(mongoosePaginate);
const TaskCreate = mongoose.model('Task', taskSchema);
module.exports=TaskCreate;
