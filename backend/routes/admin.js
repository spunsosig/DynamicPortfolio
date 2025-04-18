const express = require('express');
const router = express.Router();
const { login, verifyToken } = require('../controllers/adminController');
const { authenticateToken } = require('../utils/auth');
const upload = require('../utils/uploadImages');
const { 
    addProject, 
    updateProject, 
    deleteProject, 
    getProjects 
} = require('../controllers/projectController');

router.post('/login', login);
router.post('/verify', verifyToken);

// Protected routes
router.use(authenticateToken);
router.get('/projects', getProjects);
router.post('/projects', upload.array('images', 5), addProject);
router.put('/projects/:id', upload.array('images', 5), updateProject);
router.delete('/projects/:id', deleteProject);

module.exports = router;