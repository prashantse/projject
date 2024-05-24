const express = require('express') 
require('dotenv').config({path:`${process.cwd()}/.env`});


const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoute');
const astchAsync = require('./utils/catchAsync');
const fs = require('fs').promises;
const path = require('path');
const AppError = require('./utils/apperr');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
   res.status(200).json({
    status: 'OK',
    message:"api is running successfully"
   })});

// all routes will be here 



// Middleware to log requests to a file
const logRequests = async (req, res, next) => {
    const logMessage = `${req.path}: ${req.method} : ${new Date().toISOString()}\n`;
    const logFilePath = path.join(__dirname, 'Log.txt');

    try {
        await fs.appendFile(logFilePath, logMessage);
        console.log("Log entry created");
    } catch (err) {
        console.error("Error writing to log file", err);
    }

    next();
};

app.use(logRequests);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users', userRouter);


app.use('*', 
astchAsync(async(req, res, next) => {
    throw new AppError('this is the neww errorrrrrrrrrr',404)
})
)

app.use((err,req,res,next) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
    }) 
})

const PORT = process.env.APP_PORT || 4000 ;
app.listen(3000, () => {
    console.log('server is running on port 3000');
});
