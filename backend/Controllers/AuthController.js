const bcrypt = require('bcrypt');
const UserModel = require("../Models/user");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        console.log("message", req.body)
        const obj = req.body;
        const { firstname, email, password, mobileno } = obj;
        const user = await UserModel.findOne({ "email": email });
        if (user) {
            return res.status(400)
                .json({ message: "user Already exists", success: false });
        }

        const userModel = new UserModel({ firstname: firstname, email: email, password: password, mobileno: mobileno });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({ message: "Signup Successfully", success: true })
    } catch (err) {
        res.status(500)
        console.log("err", err)
            .json({
                message: "internal server error",
                success: false
            })
    }
}
const login = async (req, res) => {
    try {

        const { email, password } = req.body; //pass come from db
        const user = await UserModel.findOne({ "email": email });
        const errorMessage = "auth is failed email or password is wrong";
        if (!user) {
            console.log("error part",);
            return res.status(403)
                .json({ message: errorMessage, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password); // comes from client
        if (!isPassEqual) {
            console.log("error part 2");
            return res.status(403)
                .json({ message: errorMessage, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,

        )
        res.status(200)
            .json({

                message: "login successfull",
                success: true,
                jwtToken,
                email,
                firstname: user.firstname
            })
    } catch (err) {
        console.log("err", err)
        res.status(500)
            .json({
                message: "internal server error",
                success: false
            })
    }
};


const Resetpassword = async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) {
            return res.status(400).json({ status: false, message: 'Token is required' });
        }

        const secretKey = process.env.JWT_SECRET || "secret-123";  // Use environment variable or fallback to a default

        // Verify the token
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                console.log("JWT verification error: ", err);
                return res.status(400).json({ status: false, message: 'Invalid or expired token' });
            }

            const user = decoded; // This should match the payload structure when the token was created

            const { password } = req.body;
            if (!password) {
                return res.status(400).json({ status: false, message: 'Password is required' });
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                await UserModel.findOneAndUpdate(
                    { email: user.email },
                    { $set: { password: hashedPassword } }
                );

                return res.status(200).json({ status: true, message: 'Password updated successfully' });
            } catch (error) {
                console.error("Password update error: ", error);
                return res.status(500).json({ status: false, message: 'Password update failed', error: error.message });
            }
        });

    } catch (error) {
        console.error("Internal Server Error: ", error);
        return res.status(500).json({ status: false, message: 'Internal Server Error', error: error.message });
    }
};

// findall data

const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({}); //, { password: 0 } if you dont want passwrd so do this
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No user found" });
        }
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
}


module.exports = {
    signup,
    login,
    Resetpassword,
    getAllUsers
}


































































































































































































































































// const loadProfile = async (req, res) => {
//     try {
//         const userData = await UserModel.findById({ _id: req.body.user_id });
//         res.render('profile', { user: userData });
//     }
//     catch (error) {
//         console.log(error.message);
//     }
// }

// const Resetpassword = async (req, res) => {
//     // try {
//     console.log(req.query);
//     const token = req.query.token;
//     if (req.query.token != undefined) {
//         return res.render('404');
//     }
//     jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
//         if (err) {
//             return res
//                 .status(400)
//                 .json({ status: false, message: 'email verification failed' });
//         } else {
//             const user = decoded;
//             console.log("user", user);
//             try {
//                 await UserModel.findOneAndUpdate(
//                     {
//                         $and: [{ email: user.email },
//                         ]
//                     },
//                     {
//                         $set: {
//                             password: bcrypt.hashSync(password),
//                         },
//                     }
//                 );
//                 return res
//                     .status(200)
//                     .json({ status: true, message: 'pwd update success' });
//             } catch (error) {
//                 console.log("error", error);

//                 return res
//                     .status(400)
//             }
//         }

//     })





// }

//     const tokenData = await UserModel.findOne({ token: token });
//     // if
//     //  (tokenData) {
//     const password = req.body.password;
//     const newPassword = await encryptedPassword(password);
//     const userData = await UserModel.findByIdAndUpdate({ _id: tokenData._id },
//         { $set: { password: newPassword, token: '' } },
//         { new: true });
//     res.status(200).send({ success: true, msg: "user password has been reset", data: tokenData });

//     // }
//     // else {
//     //     res.status(200).send({ success: true, msg: "this link is expired " });

//     // }

//         catch (error) {
//     console.log("error occur", error)
//     // res.status(400).send({ success: false, msg: error.message });

// }
// const Resetpassword = async (req, res) => {
//     try {
//         console.log(req.query);
//         const token = req.query.token;

//         if (!token) {
//             return res.render('404'); // Render 404 if token is missing
//         }

//         const data = jwt.verify(token, "secret-123");
//         console.log("data d..", data);
//         // jwt.verify(token, key, async function (err, decoded) {

//         //     if (err) {
//         //         console.log("=====", err);

//         //         return res.status(400).json({ status: false, message: 'Email verification failed' });
//         //     } else {
//         //         const user = decoded;
//         //         console.log("user", user);

//         //         const { password } = req.body;
//         //         if (!password) {
//         //             return res.status(400).json({ status: false, message: 'Password is required' });
//         //         }

//         //         try {
//         //             const hashedPassword = await bcrypt.hash(password, 10);
//         //             await UserModel.findOneAndUpdate(
//         //                 { email: user.email },
//         //                 { $set: { password: hashedPassword } }
//         //             );

//         //             return res.status(200).json({ status: true, message: 'Password update success' });
//         //         } catch (error) {
//         //             console.log("error", error);
//         //             return res.status(400).json({ status: false, message: 'Password update failed', error: error.message });
//         //         }
//         //     }});

//     } catch (error) {
//         console.log("error", error);
//         return res.status(500).json({ status: false, message: 'Internal Server Error', error: error.message });
//     }
// };

























