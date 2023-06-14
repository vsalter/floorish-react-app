import asyncHandler from '../middleware/asyncHandler.js';
import user from '../models/user.js';



const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const User = await user.findOne({ email });

    if (User && (await User.matchPassword(password))) {
        res.json({
            _id: User._id,
            name: User.name,
            email: User.email,
            isAdmin: User.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    res.send('register user');
});

const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user');
});

const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile');
});

const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile');
});

const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

const getUserByID = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser,
}



