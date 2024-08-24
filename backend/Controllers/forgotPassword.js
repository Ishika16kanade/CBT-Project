const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const UserModel = require("../Models/user");
const jwt = require('jsonwebtoken');


const sendMail = async (req, res) => {
    // let testAccount = await nodemailer.createTransport();
    try {
        console.log("working", req.body);
        const { email } = req.body;
        if (!email) {
            return res.status(400)
                .json({ message: 'Please Enter  registered mail id ' });
        }

        const oldUser = await UserModel.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "user not exists" });
        }


        const secret = process.env.JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email }, secret, { expiresIn: '5m' });
        const link = `http://localhost:3000/resetpassword/${token}`;
        console.log(link);
        // https://github.com/Ishika16kanade/CBT-Full-Stack-Project.git

        // const sendMail = async (req, res) => {
        //     const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //     // Continue with sending the em
        // };
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'kanadeisha@gmail.com',
                pass: 'arqkpwswqtkmauth'
            }
        });

        let info = await transporter.sendMail({
            from: '"Ishika Kanade"  <ishikakanade123@gmail.com>',
            to: email,
            subject: 'Hello ',
            text: "Email Container",
            html: `<p> Click this link and reset your password</p> <button >  <a href=${link}>Click Here</a></button/>`

        }, (error) => {
            if (error) {
                console.log("err", error);
            }
        });
        res.json({
            message: "Mail has been send  successfully",
            success: true,
            info: info
        }
        )

    }
    catch (error) {

        console.log("err", error);
    }
}
module.exports = sendMail;