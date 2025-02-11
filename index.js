const express = require('express');
//const connectDB = require('./config/db')
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const  connectDB  = require('./config/db');
const router = require('./routes');
const { errorResponse } = require('./controllers/responseController');


app.use(cors({
    origin: "",
    credentials: true
}));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 5000;
app.use('/api', router)
app.get('/', (req, res)=>{
    res.json({
        message: 'Hello world'
    })

})
connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server on running port ${port}`)
    })
});


//Client error handling
app.use((req, res, next)=>{
    next(createError(404, 'Route not found!'));
})
//Server error handling -> all the error
app.use((err, req, res, next)=>{
   return errorResponse(res, {statusCode: err.status, message: err.message})
    // return res.status(err.status || 500).json({
    //     success: false,
    //     message: err.message
    // })
 })
