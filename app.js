const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');

//Mongoose models :

const { List, Task} = require('./db/models');

/* MIDDLEWARE */

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

/* ROUTES MANAGER */

/* LISTES ROUTES */

app.get('/lists', (req, res) =>
{
	//Return array of all lists in database

	List.find({}).then((lists) =>
	{
        res.send(lists);
    }).catch((e) =>
	{
        res.send(e);
    });
});

app.post('/lists', (req, res) => 
{
	//Create a list
	let title = req.body.title;

	let newList = new List
    ({
        title,       
    });
    newList.save().then((listDoc) =>
    {        
        res.send(listDoc);
    })
});

app.patch('/lists/:id', (req, res) =>
{
	//Update specified list
    List.findOneAndUpdate({ _id: req.params.id},
    {
        $set: req.body
    }).then(() =>
    {
        res.sendStatus(200); //"everything is fine"
    });
});


app.delete('/lists/:id', (req, res) =>
{
	//Delete specified list
    List.findOneAndRemove
    ({
        _id: req.params.id        
    }).then((removedListDoc) =>
    {
        res.send(removedListDoc)
    });
});

/* TASKS ROUTES */

app.get('/lists/:listId/tasks', (req, res) =>
{
   
    Task.find
    ({
        _listId: req.params.listId
    }).then((tasks) =>
    {
        res.send(tasks);
    })
});

app.post('/lists/:listId/tasks', (req, res) =>
{
    // We want to create a new task in a list specified by listId
        
    let newTask = new Task
    ({        
        _listId: req.params.listId,
        title: req.body.title
    });

    newTask.save().then((newTaskDoc) =>
    {
        res.send(newTaskDoc);
    })        
})

app.patch('/lists/:listId/tasks/:taskId', (req, res) =>
{
    // We want to update an existing task (specified by taskId)
    
    Task.findOneAndUpdate
    (
        {
        _id: req.params.taskId,
        _listId: req.params.listId
        },

        {
            $set: req.body
        }
    ).then
    (() =>
        {
            res.send({ message: 'Updated successfully.' })
        }
    )    
});

app.delete('/lists/:listId/tasks/:tasksId', (req, res) =>
{     
    Task.findOneAndRemove
    ({
        _id: req.params.taskId,
        _listId: req.params.listId

    }).then((removedTaskDoc) =>
    {
        res.send(removedTaskDoc);
    })
});

app.listen(3001, () =>
{
	console.log("Server listening on port 3001.");
})