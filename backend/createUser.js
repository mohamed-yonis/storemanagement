// backend/createUser.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Make sure this path matches your User model

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Connected to MongoDB');

    // Define user details
    const username = "admin";
    const password = "password123";
    const role = "admin";

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        console.log('User already exists');
        mongoose.connection.close();
        return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    console.log('User created:', newUser);
    mongoose.connection.close();
}).catch(err => console.error('Error connecting to MongoDB:', err));
