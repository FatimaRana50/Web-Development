// app/models/User.js
// Defines the structure (schema) for user documents stored in MongoDB

import mongoose from "mongoose"

// Define what a User document looks like in the database
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],   // Must be provided
      unique: true,                             // No two users can have the same email
      lowercase: true,                          // Always store email in lowercase
      trim: true,                               // Remove whitespace from both ends
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"], // Basic email format check
    },
    password: {
      type: String,
      required: [true, "Password is required"], // Must be provided
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
)

// Export the model — use existing model if already compiled (avoids Next.js hot-reload errors)
export default mongoose.models.User || mongoose.model("User", UserSchema)
