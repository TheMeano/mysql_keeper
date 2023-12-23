import mysql from "mysql";
import 'dotenv/config'


const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`

 export const db = mysql.createConnection(urlDB)

