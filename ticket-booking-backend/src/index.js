import expresss from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './routers/user.router.js';
import ticketRouter from './routers/ticket.router.js';
import errorHandler from './utils/errorHandler.js';
import handleErrors from './utils/errorHandler.js';
import mysql2 from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const app = expresss();
const PORT = process.env.PORT || 8386;

//Use routers
app.use('/api/users', userRouter);
app.use('/api/tickets', ticketRouter);
app.use(errorHandler);

app.use("*", (req, res, next) => {
    const error = new Error("Resource not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    handleErrors(error, req, res, next);
})


//API security
app.use(helmet());

//handle CORS errors
app.use(cors());

//Mysql connection setup

// importing mysql module
// configurations for creating mysql connection
const connection = mysql2.createConnection({
    host: process.env.DB_HOST,     // host for connection
    port: process.env.DB_PORT,            // default port for mysql is 3306
    database: process.env.DB_NAME,      // database from which we want to connect our node application
    user: process.env.USER,          // username of the mysql connection
    password: process.env.PASSWORD       // password of the mysql connection
});

// executing connection
if (process.env.NODE_ENV === 'production') {
    connection.connect((err) => {
        if (err) {
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
    });
}

//Loggers
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/", (req, res) => {
    res.json({message: "Welcome to Ticketing API"});
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
