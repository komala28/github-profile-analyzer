const mysql = require("mysql2");

console.log("HOST:", process.env.MYSQL_HOST);
console.log("USER:", process.env.MYSQL_USER);
console.log("DB:", process.env.MYSQL_DATABASE);

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("MySQL Connected");
});

module.exports = connection;
