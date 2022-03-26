var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
function Load(app) {

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    console.log(1);

    let storyloader = require('./public/database/mongodb');
    let report = {title: "title", name: "Jeffery", intro: "unlimited"};
    storyloader(report);
    console.log(2);
}
module.exports=Load;