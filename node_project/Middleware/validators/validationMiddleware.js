const { createUserSchema , updateUserSchema } = require('../../utils/validation');

function validate(schema){
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.json({
                success: false,
                message: 'Validation error',
                details: error.details.map(detail => detail.message)
            });
        }
        next();
    };
}

function tokenvalidate(token){

}
const validateCreateUser = validate(createUserSchema);
const validateUpdateUser = validate(updateUserSchema);

module.exports = {
    validateCreateUser,
    validateUpdateUser,
};