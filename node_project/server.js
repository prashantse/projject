const express = require('express') 
require('dotenv').config({path:`${process.cwd()}/.env`});


const authRouter = require('./routes/authRoutes');
const astchAsync = require('./utils/catchasync');
const AppError = require('./utils/apperr');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
   res.status(200).json({
    status: 'OK',
    message:"api is running successfully"
   })});

// all routes will be here 

app.use('/api/v1/auth',authRouter);

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
