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

var Story = new Schema({
    title:{type:String, max:100},
    auther:{type:String, max:100},
    date:{type:Date, default: Date.now()},
    intro:{type:String, max:100},
    photo:{type:String},
    base64:{type:String}
});

var storyModel = mongoose.model('Story', Story);

module.exports = storyModel;