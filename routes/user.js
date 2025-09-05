const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

// ✅ Get all users (Admin only)
router.get("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"], // password mat bhejna
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a user (Admin only)
// router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     await user.destroy();
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();

    // ✅ Check if table empty, reset AUTO_INCREMENT
    const count = await User.count();
    if (count === 0) {
      await sequelize.query("ALTER TABLE user AUTO_INCREMENT = 1");
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
