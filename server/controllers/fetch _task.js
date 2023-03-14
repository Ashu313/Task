const TaskCreate = require("../model/CreateTask");
const expressAsyncHandler=require('express-async-handler')
 

const fetchTask=expressAsyncHandler (async(req,res)=>{
    
    const searchText = req.query.searchText;

    console.log(searchText)
    const query = searchText ? { $or: [{ 'name': { $regex: searchText, $options: 'i' } }, { 'description': { $regex: searchText, $options: 'i' } }] } : {};
  
    const {page}=req.query;
     //const{limit}=req.query;
    
    console.log(query);    
    const options = {
        page: Number(page),
        limit: 10,
       // populate: 'task_list',
        select: 'name description periodType period dueDate'
      };

     
    try{

        const income=await TaskCreate.paginate(query,options)
       console.log(income);
        res.json(
            {
                count:income.totalDocs,
                income:income,
               
            }
        );
    }
    catch(err)
    {
        res.json(err);
    }
});
module.exports=fetchTask;