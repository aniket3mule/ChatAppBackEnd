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

module.exports = sequelize;