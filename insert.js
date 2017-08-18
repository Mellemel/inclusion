var database = require('./database');


database.User.sync({ force: true }).then(() => {
        database.User.bulkCreate([
  { name: 'Terron M. Johnson', isAdmin: true, email: 'tmj72386@gmail.com', password: 'cooling' }
]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
  return database.User.findAll();
}).then(users => {
  console.log(users) // ... in order to get the array of user objects
})
    }).catch((err)=>{
        console.log(err)
    })

  /* console.log(errors) would look like:
  [
    { record:
    ...
    errors:
      { name: 'SequelizeValidationError',
        message: 'Validation error',
        errors: [Object] } },
    { record:
      ...
      errors:
        { name: 'SequelizeValidationError',
        message: 'Validation error',
        errors: [Object] } }
  ]
  */