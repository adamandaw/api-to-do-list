const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/tacheController');


router.post('/taches', tacheController.createTache);
router.get('/taches', tacheController.getTaches);
router.get('/taches/:id', tacheController.getTacheById);
router.put('/taches/:id', tacheController.updateTache);
router.delete('/taches/:id', tacheController.deleteTache);

module.exports = router;