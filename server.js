require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const taskRouter = require('./api/routes/taskRouter');
const db = require('./models');

// Handle CORS (allow all origins)
app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', taskRouter);

// DB Sync
if (process.env.DB_SYNC) {
    db.sequelize.sync().then(function () {
        console.log('DB Synced');
    })
}

app.listen(port, () => console.log(`App is listening on port ${port}`));


