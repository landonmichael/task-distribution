require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const taskRouter = require('./api/routes/taskRouter');
const agentRouter = require('./api/routes/agentRouter');
const db = require('./models');

// Swagger
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle CORS (allow all origins)
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add routes
app.use('/api/tasks', taskRouter);
app.use('/api/agents', agentRouter);

// DB Sync
if (process.env.DB_SYNC) {
    db.sequelize.sync().then(function () {
        console.log('DB Synced');
    })
}

app.listen(port, () => console.log(`App is listening on port ${port}`));


