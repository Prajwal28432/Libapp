const express = require('express');
const dotenv  = require('dotenv');
const connectDB = require('./config/DB');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const port  = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
// app.get('/',(req,res)=>{
//     res.send("eh");
// })

app.use('/api/authors',authorRoutes);

app.use('/api/books',bookRoutes);

app.listen(port,()=>{
    console.log(`app is listing on port ${port}`);
})