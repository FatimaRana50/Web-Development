// app/lib/db.js
// This file handles the connection to our MongoDB database

import mongoose from "mongoose"

// Track connection state to avoid creating multiple connections
let isConnected = false

export async function connectDB() {
  // If already connected, skip reconnecting
  if (isConnected) {
    return
  }

  // Check mongoose's built-in connection state (1 = connected)
  if (mongoose.connection.readyState >= 1) {
    isConnected = true
    return
  }

  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "task8auth", // The name of the database to use
    })

    isConnected = true
    console.log("✅ MongoDB connected successfully")
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error)
    throw new Error("Failed to connect to MongoDB")
  }
}
