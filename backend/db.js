import mysql from "mysql";
import 'dotenv/config'

 export const db = mysql.createConnection({
    host: "localhost",
    user: "rootbasti",
    password: process.env.DB_KEY,
    database: "keeper"
 })