import asyncHandler from '../middleware/asyncHandler.js';
import user from '../models/user.js';
import generateToken from '../utils/generateToken.js';



const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const User = await user.findOne({ email });

    if (User && (await User.matchPassword(password))) {
        generateToken(res, User._id);

        res.status(200).json({
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
    const { name, email, password } = req.body;

    const userExists = await user.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const User = await user.create({
        name,
        email,
        password
    });

    if (User) {
        generateToken(res, User._id);

        res.status(200).json({
            _id: User._id,
            name: User.name,
            email: User.email,
            isAdmin: User.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid User data');
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

const getUserProfile = asyncHandler(async (req, res) => {
    const User = await user.findById(req.user._id);

    if (User) {
        res.status(200).json({
            _id: User._id,
            name: User.name,
            email: User.email,
            isAdmin: User.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('User not found');
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const User = await user.findById(req.user._id);

    if (User) {
        User.name = req.body.name || User.name;
        User.email = req.body.email || User.email;

        if (req.body.password) {
            User.password = req.body.password;
        }

        const updatedUser = await User.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await user.find({});
    res.status(200).json(users);

});

const getUserByID = asyncHandler(async (req, res) => {
    const User = await user.findById(req.params.id).select('-password');

    if (User) {
        res.status(200).json(User);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const User = await user.findById(req.params.id);

    if (User) {
        if (User.isAdmin) {
            res.status(400);
            throw new Error('Cannot delete admin user');
        }
        await user.deleteOne({ _id: User._id })
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const User = await user.findById(req.params.id);

    if (User) {
        User.name = req.body.name || User.name;
        User.email = req.body.email || User.email;
        User.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await User.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error ('User nto found');
    }
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



