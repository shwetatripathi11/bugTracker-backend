const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

// Create Project (Admin only)
router.post('/', authMiddleware, isAdmin, async (req, res) => {
    try {
        const { name, description } = req.body;

        const newProject = await Project.create({ name, description });

        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Projects (Any logged-in user)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
