import mysql from "mysql";
import 'dotenv/config'

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`

 export const db = mysql.createConnection({
    host: "localhost",
    user: "rootbasti",
    password: process.env.DB_KEY,
    database: "keeper"
 })