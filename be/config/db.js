const mysql2 = require('mysql2')

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "ChaiLa#1321",
  database: "user_management",
  dateStrings: true
});

db.connect((err)=>{
    if(err)
        console.log("error connecting in Database", err );
    else
    console.log("connected to Databse");            
})

module.exports = db;