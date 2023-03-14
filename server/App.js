const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
const dbConnect=require('../server/database/database');
const fetchTask = require('./controllers/fetch _task');
const CreateTask = require('./controllers/TaskCntroller');
const CreateTask1 = require('./controllers/Taskcreate');
dbConnect();

const port=5000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
const Route=express.Router();
  app.post('/api/createTaskList',CreateTask);
  app.post('/api/CreateTask',CreateTask1);
  app.get('/api/fetchTask',fetchTask)
  app.listen(port, () => {
    console.log(`Server started on port ${5000}`);
  });

