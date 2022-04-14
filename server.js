const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

const penyakitRoutes = require('./routes/penyakit.route');
const dnaRoutes = require('./routes/dna.route');
const searchDNARoutes = require('./routes/search.route');

dotenv.config();
const app = express()
const port = 3000;

app.use(express.json())
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    res.setHeader('Access-Control-Allow-Headers','*'),
    next();
})

const uri = "mongodb+srv://stima:" +
            process.env.MONGO_ATLAS_PW +
            "@cluster0.q0h1s.mongodb.net/dnapatternmatching?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true });
console.log('connected to MongoDB');

app.use("/penyakit", penyakitRoutes);
app.use("/dna", dnaRoutes);
app.use("/search", searchDNARoutes);

app.listen(port);