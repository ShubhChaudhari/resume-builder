require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.route');
const resumeRoutes = require('./routes/resume.route');

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Connect database
connectDB();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);


//Server uploads folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    }
  })
)

//Start server
console.log('process.env.PORT',process.env.PORT);
console.log('PORT:', process.env.PORT, typeof process.env.PORT);

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));