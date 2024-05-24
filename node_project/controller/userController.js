const { Sequelize } = require('sequelize');
const user = require('../db/models/user');
const catchAsync = require('../utils/catchAsync');


const getAllUser = catchAsync(async (req, res, next) => {
    const users = await user.findAndCountAll({
        where: {
            userType: {
                [Sequelize.Op.ne]: '0',
            },
        },
        attributes: { exclude: ['password'] },
    });
    return res.status(200).json({
        status: 'success',
        data: users,
    });
});

const getUserById = catchAsync(async (req, res, next) => {
    const  userId  = req.params.id;
    const userProfile = await user.findByPk(
        userId,{
            attributes: {
                 exclude: ['password'] }},);

    if (!userProfile) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }

    return res.status(200).json({
        status: 'success',
        data: userProfile,
    });
});


const updateUser = catchAsync(async (req, res, next) => {
    const body = req.body;
    const  userId  = req.params.id;
    const userProfile = await user.findByPk(userId,{
        attributes: {
             exclude: ['password'] }});
    

    if (!userProfile) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }


    userProfile.userType= body.userType;
    userProfile.firstName= body.firstName;
    userProfile.lastName= body.lastName;
    userProfile.email= body.email;
   
    const updatedResult = await userProfile.save();

    return res.json({
        status:'updated successfully',
        data: updatedResult,
    });
});

const deleteUserProfile = catchAsync(async(req , res , next) => {
    const  userId  = req.params.id;
    const userProfile = await user.findByPk(userId);

    if (!userProfile) {
        return res.json({
            status: 'fail',
            message: 'User not found',
        });
    }

    await userProfile.destroy();

    return res.json({
        status:'success',
        message: 'User deleted successfully',
    });
  
});

const updatePassword = catchAsync( async (req , res , next ) => {
        const {oldPassword , newPassword} = req.body;
        const  userId  = req.params.id;
        const userProfile = await user.findByPk(userId);

        if (!userProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        
       const match = await bcrypt.compare(oldPassword, userProfile.password);
        if(!match) {
            res.status(200).json({ 
                status:'fail',
               message: 'Password mismatch'
            })
        }
        
        const hashPassword = bcrypt.hashSync(newPassword,10)
        userProfile.password = hashPassword;
        const updatedResult = await userProfile.save();

        return res.status(200).json({
            status:'updated successfully',
            data: updatedResult,
        });
});


module.exports = {
    getAllUser,
    getUserById,
    updateUser,
    deleteUserProfile,
    updatePassword
};