import express from "express";
import mongoose from "mongoose";

const app = express();

// Database connection function
async function connectDatabase() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(
      "mongodb+srv://REMEZ:REMEZ@cluster01.qrulfpd.mongodb.net/?retryWrites=true&w=majority",
      connectionParams
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
}

// Connect to database
connectDatabase();

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
