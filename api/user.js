const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/addUser', userController.createUser);
router.get('/getUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.put('/updatebyid/:id', userController.updateUser);
router.delete('/deleteById/:id', userController.deleteUser);

module.exports = router;
