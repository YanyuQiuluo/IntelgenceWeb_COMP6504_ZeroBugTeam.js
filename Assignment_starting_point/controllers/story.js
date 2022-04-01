let Story = require('../models/story');

exports.insert = function (req, res){
    res.setHeader('Content-Type', 'application/json');
    let story = req.body;
    if (story == null) {
        res.status(403).send('No data sent!')
    }

    let newStory = new Story({
        title: story.title,
        auther: story.auther,
        date: Date.now(),
        intro: story.intro
    });
    console.log('received: ' + newStory);

    newStory.save()
        .then((results)=>{
            console.log("object saved: "+ JSON.stringify(results));
            res.JSON(newStory);
        })
        .catch((error)=>{
            console.log('Could not insert - probably incorrect data! ' + JSON.stringify(error));
        })
}