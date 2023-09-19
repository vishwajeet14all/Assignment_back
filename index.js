const express = require("express");
const dotenv = require('dotenv')
const db = require("./config/db");
const router  = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
const path = require('path')

const port  = process.env.PORT || 8000;



//dotenv config
dotenv.config();


// middleware
app.use(cors());
app.use(express.json());


//routes
app.use("/users", router);


// //static files
// app.use(express.static(path.join(__dirname,"./client/build")))
// app.get('*',function(req,res){
//   res.sendFile(path.join(__dirname,'./client/build/index.html'))
// })



app.listen(port, async () => {  
  console.log(`Server is running in ${process.env.NODE_MODE} at port ${process.env.PORT}`);
});
