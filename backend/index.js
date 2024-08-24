

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/authRouter');
const forgotPassword = require('./Controllers/forgotPassword');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})









// const start = async () => {
//     try {
//         app.listen(PORT, () => {
//             console.log(`server is running on ${PORT}`)
//         });
//     }
//     catch (error) { }
// };
// start();

