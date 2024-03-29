const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const dbConfig = require('./config/dbConfig')
app.use(express.json());
app.use(cors())
const userRoute = require("./routes/userRoute")
const adminRoute = require("./routes/adminRoute")
const doctorRoute = require("./routes/doctorRoute")
const path = require("path");
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute)
app.use('/api/doctor', doctorRoute);
const port = process.env.PORT || 5000

// if(process.env.NODE_ENV === 'production'){
//     app.use('/', express.static('https://snapwell.onrender.com/client/build'));
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve('https://snapwell.onrender.com/client/build/index.html'));
//     })
// }

app.get("/", (req,res)=>{
    res.json("Server");
});

app.listen(port, () => console.log(`listening on port ${port}`));
