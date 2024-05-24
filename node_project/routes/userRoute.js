const { verifyToken } = require('../Middleware/validators/tokenVerify');
const {validateUpdateUser} = require('../Middleware/validators/validationMiddleware');

const { 
    getAllUser,
    getUserById,
    updateUser,
    deleteUserProfile,
    updatePassword

} = require('../controller/userController');

const router = require('express').Router();

router.route('/').get(getAllUser);              // working
router.route('/:id').get(verifyToken, getUserById);          // working

router.route('/:id/update').patch(validateUpdateUser,updateUser);   // working

router.route('/:id/delete').delete(deleteUserProfile);  // working

router.route('/:id/updatepassword').patch(updatePassword);  // working


module.exports = router;