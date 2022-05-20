const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/storyDB';

connection = mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    checkServerIdentity: false,
})
    .then(() => {
        console.log('connection to mongodb worked!');
    })
    .catch((error) => {
        console.log('connection to mongodb did not work! ' + JSON.stringify(error));
    });

var Schema = mongoose.Schema;
const required = true;

var Story = new Schema({
    title:{type:String, max:100},
    author:{type:String, max:100, required},
    date:{type:String, default: Date.now()},
    intro:{type:String, max:100},
    photo:{type:String, required},
    base64:{type:String}
});

var storyModel = mongoose.model('Story', Story);

module.exports = storyModel;