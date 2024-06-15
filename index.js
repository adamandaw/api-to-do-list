const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv=require('dotenv');



const app = express();
const port = 9003;
dotenv.config({path:'./.env'});

const tacheRoutes = require('./routes/tacheRoutes');




// Connexion à la base de données MongoDB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(bodyParser.json());
app.use('/api/v1', tacheRoutes);


// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarrérr sur le port : ${port}`);
});
