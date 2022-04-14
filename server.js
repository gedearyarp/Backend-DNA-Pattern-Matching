const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

const penyakitRoutes = require('./routes/penyakit');
const predictRoutes = require('./routes/predict');
const searchDNARoutes = require('./routes/searchDNA');

dotenv.config();
const app = express()

app.use(express.json())
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    res.setHeader('Access-Control-Allow-Headers','*'),
    next();
})

const uri = "mongodb+srv://stima:" +
            process.env.MONGO_ATLAS_PW +
            "@cluster0.q0h1s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectToMongo = async () => {
    try {
        mongoose.connect(uri, { useNewUrlParser: true });
        console.log('connected to MongoDB');
    } catch(error) {
        console.log('error connection to MongoDB:', error.message);
    }
};

connectToMongo();

app.use("/penyakit", penyakitRoutes);
app.use("/predict", predictRoutes);
app.use("/searchDNA", searchDNARoutes);

app.listen(process.env.PORT);