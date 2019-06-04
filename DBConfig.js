/** 
 * Setting up a connection using Sequelize
*/
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://aniket:lightroom@localhost:5432/chatappbridge');
/**
 * Testing the connection
 */
sequelize
.authenticate()
.then(()=>{
console.log('Connection has been established successfully: ');
})
.catch(err => {
console.log('Unable to connect to the database: ',err);
});

// const Users = sequelize.define('users', {
//     //attributes
//     fname: {
//         type : Sequelize.STRING,
//         allowNull: false
//     },
//     lname: {
//         type : Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type : Sequelize.STRING,
//         allowNull: false
//     },
//     password: {
//         type : Sequelize.STRING,
//         allowNull: false
//     },
//     timestamp
// })

// Users.sync({ force: true }).then(() => {
//     // Now the `users` table in the database corresponds to the model definition
//     return User.create({
//       firstName: 'John',
//       lastName: 'Hancock'
//     });
//   });

module.exports = sequelize;