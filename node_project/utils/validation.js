const Joi = require('joi') 
  
   
const createUserSchema = Joi.object({ 
        userType: Joi.number()
                   .valid(0,1,2)
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
    

const updateUserSchema = Joi.object({ 
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
    }).options({ abortEarly: false }); 

module.exports = {
    createUserSchema,
    updateUserSchema
}
