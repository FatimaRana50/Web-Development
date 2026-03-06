const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema with validation
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async register() {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ username: this.username });
    if (existingUser) {
      throw new Error('Username already taken');
    }

    // Hash password before saving (never store plain text)
    const hashedPassword = await bcrypt.hash(this.password, 10);

    const newUser = new UserModel({
      username: this.username,
      password: hashedPassword
    });

    await newUser.save();
    return 'User registered successfully';
  }

  async login() {
    // Find user by username only, then verify password separately
    const foundUser = await UserModel.findOne({ username: this.username });

    if (!foundUser) {
      throw new Error('Invalid username or password');
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(this.password, foundUser.password);

    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    return foundUser;
  }
}

module.exports = User;
