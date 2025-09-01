const express = require('express');
const router = express.Router();
const Bug = require('../models/bug');
const Project = require('../models/project');
const { authMiddleware } = require('../middleware/authMiddleware');

// -------------------------
// 1. Create Bug (Tester only)
// -------------------------
router.post('/', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'tester') {
            return res.status(403).json({ message: "Only testers can report bugs" });
        }

        const { project_id, title, description, severity } = req.body;

        // Bug create hoga
        const newBug = await Bug.create({
            project_id,
            title,
            description,
            severity,
            created_by: req.user.id
        });

        res.status(201).json({ message: "Bug reported successfully", bug: newBug });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -------------------------
// 2. Get All Bugs (any logged in user)
// -------------------------
router.get('/', authMiddleware, async (req, res) => {
    try {
        const bugs = await Bug.findAll({ include: Project });
        res.json(bugs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -------------------------
// 3. Update Bug Status (Developer only)
// -------------------------
router.put('/:id/status', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'developer') {
            return res.status(403).json({ message: "Only developers can update status" });
        }

        const { status } = req.body;
        const bug = await Bug.findByPk(req.params.id);

        if (!bug) return res.status(404).json({ message: "Bug not found" });

        bug.status = status;
        bug.assigned_to = req.user.id; // jis developer ne kaam kiya
        await bug.save();

        res.json({ message: "Bug status updated", bug });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -------------------------
// 4. Delete Bug (Admin only)
// -------------------------
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admin can delete bugs" });
        }

        const bug = await Bug.findByPk(req.params.id);
        if (!bug) return res.status(404).json({ message: "Bug not found" });

        await bug.destroy();
        res.json({ message: "Bug deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
