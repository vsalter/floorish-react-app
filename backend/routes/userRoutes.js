import express from 'express';
const router = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser,
} from '../controllers/userCtlr.js';


router.route('/').post(registerUser).get(getUsers);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserByID).put(updateUser);

export default router;