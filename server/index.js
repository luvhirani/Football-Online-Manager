const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
const env = require('dotenv');

const authRoutes = require("./routes/auth");
const teamRoutes = require("./routes/team");
const transferRoutes = require("./routes/transfer");

const app = express();
app.use(express.json());
env.config();

app.use(cors());

const PORT =  process.env.PORT || 5001;

app.use("/auth", authRoutes);
app.use("/team", teamRoutes);
app.use("/transfer", transferRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

