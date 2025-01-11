const express = require('express');
const connectDb = require('../database/database');
const user = require('../database/user');
const route = express.Router();

// POST: Create a new user
route.post('/addUser', async (req, res) => {  
    try {
        const db = await connectDb();
        const createdUser = await user.create(db, req.body);
        res.json(createdUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
});  

// GET: Get all users
route.get('/getUsers', async (req, res) => {
    try {
        const db = await connectDb();
        const users = await user.findAll(db);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET: Get user by ID
route.get('/getUserById/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const foundUser = await user.findById(db, req.params.id);
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(foundUser);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: error.message });
    }
});

// PUT: Update user by ID
route.put('/updatebyid/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const { firstName, lastName } = req.body; // Extract only the data to update
        const id = req.params.id; // Get ID from URL parameter
        
        const updatedUser = await user.update(db, id, { firstName, lastName });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message });
    }
});


// DELETE: Delete user by ID
route.delete('/deleteById/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const result = await user.delete(db, req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = route;
