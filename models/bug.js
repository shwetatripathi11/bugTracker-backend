const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Project = require('./project');
const User = require('./user');

const Bug = sequelize.define('Bug', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    severity: { type: DataTypes.ENUM('low', 'medium', 'high'), defaultValue: 'low' },
    status: { type: DataTypes.ENUM('open', 'in_progress', 'resolved'), defaultValue: 'open' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,     // ✅
    tableName: 'bugs'
});

// Associations
Bug.belongsTo(Project, { foreignKey: 'project_id' });
Bug.belongsTo(User, { as: 'creator', foreignKey: 'created_by' });
Bug.belongsTo(User, { as: 'assignee', foreignKey: 'assigned_to' });

module.exports = Bug;
