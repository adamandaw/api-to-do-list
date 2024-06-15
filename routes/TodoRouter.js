const express = require('express');
const router = express.Router();
const ToDoController = require('../controllers/ToDoController');


router.post('/taches', ToDoController.createTache);
router.get('/taches', ToDoController.getTaches);
router.get('/taches/:id', ToDoController.getTacheById);
router.put('/taches/:id', ToDoController.updateTache);
router.delete('/taches/:id', ToDoController.deleteTache);

module.exports = router;