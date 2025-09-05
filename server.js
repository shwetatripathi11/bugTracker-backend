const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/db');

// Middleware
app.use(cors());
app.use(express.json());

//model import 
const User = require('./models/user');
const Project = require('./models/project');
const Bug = require('./models/bug');
//routes import
const authRoutes = require('./routes/auth.js');
app.use('/auth', authRoutes);
//project creation route
const projectRoutes = require('./routes/project.js');
app.use('/projects', projectRoutes);
//bug route
const bugRoutes = require('./routes/bug.js');
app.use('/bugs', bugRoutes);
//user route
const userRoutes = require("./routes/user.js");
app.use("/users", userRoutes);








// Test Route
app.get('/', (req, res) => {
    res.send('Bug Tracker Backend Running...');
});

//database connection 
sequelize.authenticate()
    .then(() => console.log('✅ Database Connected...'))
    .catch(err => console.log('❌ Error: ' + err));


// Sync Models
sequelize.sync()
    .then(() => console.log("✅ Models synced with DB"))
    .catch(err => console.log("❌ Error syncing models: " + err));

// Start Server
const PORT = process.env.DB_PORT||5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
