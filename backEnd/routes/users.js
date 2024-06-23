const express = require('express');
const router = express.Router();
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/userController');

// get all users
router.get('/users', getUsers);
// get user
router.get('/user/:id', getUser);
// create users
router.post('/', createUser);
// delete user
router.delete('/user/:id',deleteUser);
// update user
router.patch('/user/:id', updateUser)

module.exports = router;
