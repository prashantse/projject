const user = require("../db/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateUser = require('../utils/validation');

const generateToken = (payload) => {
 return jwt.sign(payload,process.env.JWT_SECRET_KEY,
    {
        expiresIn: process.env.JWR_EXPIRES_IN
      })
};
 
const signup = async (req,res,next) => {
   const body = req.body;

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

const login = async (req, res) => {
  try {
 const { email, password } = req.body;
 
    //find a user by their email
    const User = await user.findOne({
      where: {
      email: email
    } 
      
    });
 
    //if user email is found, compare password with bcrypt
    if (User) {
      const isSame = await bcrypt.compare(password, User.password);
 
      //if password is the same
       //generate token with the user's id and the secretKey in the env file
 
      if (isSame) {
        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
 
        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(User, null, 2));
        console.log(token);
        //send user data
        return res.status(201).send({
         status:"success",
         token,
        });
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
 };
 

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
