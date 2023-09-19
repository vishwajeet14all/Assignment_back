const mongoose = require("mongoose");
require('dotenv').config(); 



mongoose.connect(process.env.DATABASE)
const db = mongoose.connection
db.once('open',() => {
    console.log("DB Connected Successfully!")
})

module.exports = db;