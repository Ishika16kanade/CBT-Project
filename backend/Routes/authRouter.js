const router = require('express').Router();
const { signup, login, Resetpassword, getAllUsers } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, forgotValidation } = require('../Middlewares/authValidation');
const forgotPassword = require('../Controllers/forgotPassword');


router.post('/forgotpassword', forgotPassword);

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/resetpassword', Resetpassword);
router.get('/profiledata', getAllUsers);

module.exports = router;



























// const { passwordReset } = require('../Models/PasswordReset');
// const UserVerification = require("../Models/UserVerification");
// const nodemailer = require("nodemailer");
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

// let transporter = nodemailer.createTestAccount({
//     service: "gmail",
//     auth: {
//         users: process.env.AUTH_EMAIL,
//         pass: process.env.AUTH_PASS
//     }

// })
// transporter.verify((error, success) => {
//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.log("Ready For Message");
//         console.log(success);
//     }
// })

