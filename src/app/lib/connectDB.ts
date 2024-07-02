// lib/mongoose.js
import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function connectDB() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(
    // "mongodb+srv://truongkhanhduydata:LljWL6XST4IhhRHB@cluster.qgnzikg.mongodb.net/Bookstore"
    "mongodb://localhost:27017/Bookstore"
  );

  connection.isConnected = db.connections[0].readyState;
}

export default connectDB;
