const user = require("../db/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateUser = require('../validators/validateUser');

const generateToken = (payload) => {
 return jwt.sign(payload,process.env.JWT_SECRET_KEY,
    {
        expiresIn: process.env.JWR_EXPIRES_IN
      })
};
 
const signup = async (req,res,next) => {
   const body = req.body;
  
    if(response.error) 
    {   
       return res.json({
          status: 'Failed',
          message: response.error.details[0].message
        }) 
    } 

   if(!['1','2'].includes(body.userType)){
     return res.status(400).json({
       status: 'Failed',
       message: 'Invalid user type'
     })
   }

 const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email:  body.email,
    password:  body.password,
    confirmPassword:  body.confirmPassword,
 }) ;  

 const result = newUser.toJSON()

 delete result.password;
 delete result.deleteAt;

 result.token = generateToken({
    id : result.id,

 })

 if(!result){
    return res.status(400).json({
        status: 'Failed',
        message: 'Failed to create user' 
      })
 }

 return res.status(201).json({
    status: 'Success',
    message: 'User created successfully',
    data: result
 })

 
};

const login = async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password){
       return res.status(400).json({
            status: 'Failed',
            message: 'Please provide a first name and password'
        })
    }

    const result =await user.findOne({where:{email}});
    if(!result || await bcrypt.compare(password, result.password)){
        return res.status(401).json({
            status: 'Fail',
            message: 'Incorrect email or password'
        })
    }
    
    const token = generateToken({
        id: result.id
    });

    return res.json({
       status:"success",
       token,
    }); 
}

// const authentication = catchAsync(( req ,res, next) => {}

//   let idToken = '';
//   if(
//     req.headers.authorization && 
//     req.headers.authorization.startsWith('Bearer')
//   ){
//     idToken = req.headers.authorization.split(' ')[1];
//   }
//   if(!idToken){
//      return next(new AppError('please login to get access token'));
//   }

//   const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);

//   const freshUser = user.findByPk(tokenDetail.id);

//   if(!freshUser){
//     return next(new AppError('user not found',400));
//   }
//   req.user = freshUser;
//   return next();// }) 

module.exports = { signup , login } 
