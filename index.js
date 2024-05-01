// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser")

// Import routes
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
const contactRoute = require("./routes/contactRoute");


// Import error middleware
const errorMiddleware = require("./middleware/errorMiddleware");

// Initialize Express app
const app = express();

// Middleware for frontend-backend communication
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// JSON middleware so our app can receive JSON data
app.use(express.json());

//Middleware for Cookies
app.use(cookieParser())

// Middleware for form data
app.use(express.urlencoded({ extended: false }));



// Import and use routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/blog", blogRoute);
app.use("/api/contact", contactRoute);


// Error middleware
app.use(errorMiddleware);

// Set mongoose options
mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose
  .connect(process.env.MD_URI)
  .then(() => {
    console.log("Connected to DB!");
    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection to DB failed!", err);
  });
