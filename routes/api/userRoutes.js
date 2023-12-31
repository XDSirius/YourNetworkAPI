const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// api/users create user and retrieving all users

router.route('/').get(getUsers).post(createUser);

// api/users/:userId for updating, deleting, and retrieving
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);
module.exports = router;