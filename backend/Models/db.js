
const mongoose = require('mongoose')
const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() => {
        console.log("MongoDB Connnected");
    }).catch((err) => {
        console.log("Mongo Connnection error", err);
    })

