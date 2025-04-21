import express from 'express';
import {
    createUser,
    getAllUsers,
    deleteAllUsers,
    getFriends,
    addFriendToUser
} from '../controllers/userController';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.delete('/', deleteAllUsers);
router.get('/:id/friends', getFriends);
router.post('/:idUser/friends/:idNewFriend', addFriendToUser);

export default router;
