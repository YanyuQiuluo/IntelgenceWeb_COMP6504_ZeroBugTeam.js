const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const uploadimg = require('./public/javascripts/uploadimg');


function Load(app) {

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/uploadimg', usersRouter);
    console.log(1);

    let storyloader = require('./database/mongodb');
    //let report = {title: "title", name: "Jeffery", intro: "unlimited"};
    //storyloader(report);
    //console.log(2);
}
module.exports=Load;