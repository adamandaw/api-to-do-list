const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    etat : {
        type: Boolean
    }

})

const Tache = mongoose.model('Tache', todoSchema);
module.exports = Tache;