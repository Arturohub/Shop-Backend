const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, logoutUser, forgotPassword, resetPassword } = require('../controllers/userController');

// login route
router.post('/login', loginUser);


router.post('/register', registerUser);
router.get("/profile", getProfile)
router.post("/logout", logoutUser)
router.post("/forgotpassword", forgotPassword)
router.post("/resetpassword", resetPassword)


module.exports = router;
