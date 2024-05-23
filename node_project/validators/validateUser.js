const Joi = require('joi') 
  
   

function validateUser(req, res, next) {
    const JoiSchema = Joi.object({ 
        userType: Joi.number()
                  .min(1) 
                  .max(1) 
                  .required(),
      
        firstName: Joi.string() 
                  .min(2) 
                  .max(30) 
                  .required(), 

        lastName: Joi.string() 
                  .min(2) 
                  .max(30) 
                  .required(),                        
                         
                    
        email: Joi.string() 
               .email() 
               .min(5) 
               .max(50) 
                .required(), 
                 
        password: Joi.string() 
                      .min(8)
                      .max(20)
                      .required(),
         
         confirmPassword: Joi.string() 
                      .min(8)
                      .max(20)
                      .required(),              
                        
    }).options({ abortEarly: false }); 
    
    const { error } = userSchema.validate(req.body);

    if (error) {
        // Return a response with validation errors
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            details: error.details.map(detail => detail.message)
        });
    }

    // Proceed to the next middleware or route handler
    next();
}
  
// const user = { 
//     username: 'Pritish', 
//     email: 'pritish@gmail.com', 
//     date_of_birth: '2020-8-11', 
//     account_status: 'activated'
// } 
  
// response = validateUser(user) 
  
// if(response.error) 
// {   
//     console.log(response.error.details) 
// } 
// else
// { 
//     console.log("Validated Data") 
// }

module.exports = {
    validateUser
}
