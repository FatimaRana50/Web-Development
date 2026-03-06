const mongoose = require('mongoose');

// Simple schema for users
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const UserModel = mongoose.model('User', userSchema);

// User class with register and login methods
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async register() {
    const newUser = new UserModel({
      username: this.username,
      password: this.password
    });
    await newUser.save();
    return 'User registered successfully';
  }

  async login() {
    const found = await UserModel.findOne({
      username: this.username,
      password: this.password
    });
    if (found) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = User;
