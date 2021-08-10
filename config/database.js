const {connect} = require('mongoose');
/**
 * this config is to connect with database
 * @returns {Promise<any>} Returns Mongoose connection as promise
 */

const DBConnection =() =>{
return connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
}

module.exports={
  DBConnection
}