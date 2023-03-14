const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const taskListSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
},
   {
      timestamps:true,
   },
  );

const TaskList = mongoose.model('TaskList', taskListSchema);
module.exports=TaskList;