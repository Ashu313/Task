const expressAsyncHandler=require('express-async-handler');
const TaskCreate=require('../model/CreateTask')
const TaskList=require('../model/tasklist');
const CreateTask1=expressAsyncHandler(async(req,res)=>{
    try {
        const { name, description, dueDate, period,periodType, tasklistID } = req.body;
        const IsoDate=new Date(new Date(dueDate.split('-').reverse().join('-')));
       const taskList = await TaskList.findById(tasklistID);
       if (!taskList) {
         return res.status(404).json({ error: 'Task list not found' });
       }
        //const task = new TaskCreate({ name, description, dueDate, period,periodType, tasklistID });
        

        if (periodType === "monthly") {
          const periodRegex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [0-9]{4}$/;
          if (!periodRegex.test(period)) {
            throw new Error(`Invalid period format: ${period}`);
          }
        } else if (periodType === "quarterly") {
          const periodRegex = /^(Q1|Q2|Q3|Q4) [0-9]{4}$/;
          if (!periodRegex.test(period)) {
            throw new Error(`Invalid period format: ${period}`);
          }
        } else if (periodType === "yearly") {
          const periodRegex = /^[0-9]{4}$/;
          if (!periodRegex.test(period)) {
            throw new Error(`Invalid period format: ${period}`);
          }
        } else {
          throw new Error(`Invalid period type: ${periodType}`);
        }
     
        console.log(`${period}`)
        const dueDateISO = new Date(IsoDate);
        console.log( new Date(period + "-01"));
        if (dueDateISO < new Date(period + "-01")) {
          throw new Error(`Due date must be after end of period: ${period}`);
        }
        console.log(dueDate);
       
    
        const task = new TaskCreate({
          name,
          description,
          dueDate:dueDateISO,
          period,
         periodType,
          tasklistID,
        });
      
        await task.save();
        res.json(req.body);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});
module.exports=CreateTask1;