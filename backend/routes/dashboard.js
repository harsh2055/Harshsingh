const express = require('express');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Contact = require('../models/Contact');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/dashboard/stats — admin only
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const [totalProjects, completedProjects, ongoingProjects, totalSkills, unreadMessages] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'completed' }),
      Project.countDocuments({ status: 'ongoing' }),
      Skill.countDocuments(),
      Contact.countDocuments({ read: false })
    ]);
    res.json({ totalProjects, completedProjects, ongoingProjects, totalSkills, unreadMessages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
