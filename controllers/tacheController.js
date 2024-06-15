const Tache = require("../models/Tache");

exports.createTache = async (req, res) => {
    try {
        const { title, description, etat } = req.body;
        const newTache = new Tache({
            title,
            description,
            etat
        });
        const savedTache = await newTache.save();
        res.status(201).json(savedTache);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTaches = async (req, res) => {
    try {
        const taches = await Tache.find();
        res.status(200).json(taches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTacheById = async (req, res) => {
    try {
        const tache = await Tache.findById(req.params.id);
        if (!tache) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json(tache);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTache = async (req, res) => {
    try {
        const { title, description, etat } = req.body;
        const tache = await Tache.findByIdAndUpdate(
            req.params.id,
            { title, description, etat },
            { new: true, runValidators: true }
        );
        if (!tache) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json(tache);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTache = async (req, res) => {
    try {
        const tache = await Tache.findByIdAndDelete(req.params.id);
        if (!tache) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json({ message: 'Tâche supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};