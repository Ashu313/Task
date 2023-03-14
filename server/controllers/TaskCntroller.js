

const expressAsyncHandler=require('express-async-handler');
const TaskList=require('../model/tasklist');

const CreateTask=expressAsyncHandler(async(req,res)=>{
  try {
    const { name, description, active } = req.body;
    console.log(req.body);
    const taskList = new TaskList({ name, description, active });
    await taskList.save();
    res.json({ success: 'true' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports=CreateTask;