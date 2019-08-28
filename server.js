require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Handle CORS (allow all origins)
app.use(cors());

app.listen(port, () => console.log(`App is listening on port ${port}`));

