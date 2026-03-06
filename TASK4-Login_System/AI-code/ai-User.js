// ai-User.js with bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // or 'bcryptjs'

// Define User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', userSchema, 'users');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async register() {
        try {
            const existingUser = await UserModel.findOne({ username: this.username });
            if (existingUser) {
                throw new Error('Username already exists');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(this.password, 10);

            const newUser = new UserModel({
                username: this.username,
                password: hashedPassword
            });

            await newUser.save();
            return 'User registered successfully';
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login() {
        try {
            const user = await UserModel.findOne({ username: this.username });
            if (!user) {
                throw new Error('Invalid credentials');
            }

            // Compare password with hash
            const isValid = await bcrypt.compare(this.password, user.password);
            if (!isValid) {
                throw new Error('Invalid credentials');
            }
            
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = User;