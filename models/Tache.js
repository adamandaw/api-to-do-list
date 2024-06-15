const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema({
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

const Tache = mongoose.model('Tache', tacheSchema);
module.exports = Tache;