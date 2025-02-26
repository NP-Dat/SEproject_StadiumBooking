import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const Schema = mysql.Schema;
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  }
});