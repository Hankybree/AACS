const mysql = require('mysql');

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
}

const mysqlConnection = mysql.createConnection(config);

mysqlConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL connected");
  }
});



module.exports = mysqlConnection