const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const env = require('dotenv');
const authRoutes = require ('./routes/auth') 

const app = express();
env.config();

const PORT =  5001;

// app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error); 
  }
};

app.use('/user', authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});