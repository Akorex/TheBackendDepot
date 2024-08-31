import mysql from 'mysql2/promise'


export const sqlConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "autobots"
})