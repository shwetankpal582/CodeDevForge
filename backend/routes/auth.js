const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modals/user");

router.post('/register', async (req, res) => {
    try {
        console.log('Registration attempt with data:', { username: req.body.username, role: req.body.role });

        const { username, password, role } = req.body;

        // Check if all required fields are present
        if (!username || !password || !role) {
            console.log('Missing required fields:', { username: !!username, password: !!password, role: !!role });
            return res.status(400).json({
                message: "All fields are required: username, password, role",
                received: { username: !!username, password: !!password, role: !!role }
            });
        }

        // Check if user already exists
        const userExist = await User.findOne({ username });
        if (userExist) {
            console.log('User already exists:', username);
            return res.status(400).json({ message: "User already exists!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            username,
            password: hashedPassword,
            role
        });

        // Save to DB
        await user.save();
        console.log('User registered successfully:', username);

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({
            error: `Error creating user: ${error.message}`,
            details: error.stack
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt for user:', req.body.username);

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found:', username);
            return res.status(404).json({ message: 'Invalid username or password.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Invalid password for user:', username);
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful for user:', username);
        res.json({ token, user: { username: user.username, role: user.role } });
    } catch (error) {
        console.error('Error in /login:', error);
        res.status(500).json({ error: `Error logging in: ${error.message}` });
    }
});

router.get('/users', async (req, res) => {
    try {
        const { role } = req.query;
        if (!role) {
            return res.status(400).json({ message: 'Role query parameter is required.' });
        }

        const users = await User.find({ role }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: `Error fetching users: ${error.message}` });
    }
});

module.exports = router;
