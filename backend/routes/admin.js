const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { login, verifyToken } = require('../controllers/adminController');
const { authenticateToken } = require('../utils/auth');
const upload = require('../utils/uploadImages');
const { 
    addProject, 
    updateProject, 
    deleteProject, 
    getProjects,
    archiveProject,
    unarchiveProject,
    getArchivedProjects
} = require('../controllers/projectController');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again later'
});

router.post('/login', loginLimiter, login);
router.post('/verify', verifyToken);

// Protected routes
router.use(authenticateToken);
router.get('/projects', getProjects);
router.post('/projects', upload.array('images', 5), addProject);
router.put('/projects/:id', upload.array('images', 5), updateProject);
router.delete('/projects/:id', deleteProject);
router.put('/projects/:id/archive', archiveProject);
router.put('/projects/:id/unarchive', unarchiveProject);
router.get('/projects/archived', getArchivedProjects);

module.exports = router;