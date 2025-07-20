const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
const env = require('dotenv');

const authRoutes = require("./routes/auth");
const teamRoutes = require("./routes/team");
const transferRoutes = require("./routes/transfer");

const app = express();
env.config();

app.use(cors());

const PORT =  5001;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/team", teamRoutes);
app.use("/transfer", transferRoutes);

app.listen(process.env.PORT || 5001, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});