//Handles connection to MongoDB

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/WebHiver', {}).then(() =>
{
    console.log("Successfully connected to MongoDB.");
}).catch((e) =>
{
    console.log("Error while attempting to connect to MongoDB.");
    console.log(e);
});

module.exports =
{
    mongoose
};