const Users = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const registerUser = async (req, res) => {
  try {
    const { name, family_name, mobile_number, email, password, profile_picture } = req.body;
    if (!email || !name || !family_name || !mobile_number || !profile_picture) {
      return res.status(400).json({ message: "Please, fill up all the input fields" });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password is required and should be at least 8 characters" });
    }

    const exist = await Users.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email is already taken. Please, try another one" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({
      email, password: hashedPassword, name, family_name, mobile_number, profile_picture
    });
    return res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (error, token) => {
      if (error) throw error;
      res.cookie("ES-token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }).json({ user, message: "User logged in successfully" });
    });

    return user;

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProfile = (req, res) => {
  const token = req.cookies["ES-token"];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
      res.json(user);
    });
  } else {
    res.status(401).json({ message: "Token not provided" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("ES-token").status(200).json({ message: "User has been logged out" });
  res.clearCookie("resetToken").status(200).json();
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
  
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found, please register" });
    }
  
    const resetToken = jwt.sign({ email: user.email, id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '15m' });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Link",
      html: `<p>Hey, ${user.name || 'user'}, you requested for a password reset, so please kindly click the following link: <a href="https://restorationshop.onrender.com/resetpassword?token=${resetToken}">here</a> to reset your password.</p>`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "Password reset link has been sent to your email" });
    });
  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
  
    if (!token || !password) {
      return res.status(400).json({ message: "Reset token and new password are required" });
    }
  
    jwt.verify(token, process.env.RESET_PASSWORD_KEY, async (error, decodedToken) => {
      if (error) {
        return res.status(401).json({ message: "Invalid or expired reset token" });
      }
  
      const user = await Users.findOne({ email: decodedToken.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: "Password reset successfully" });
    });
  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = { registerUser, loginUser, getProfile, logoutUser, forgotPassword, resetPassword };
