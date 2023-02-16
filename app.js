
require('dotenv').config({path: './.env'});
const express = require('express');
const noteRouter = require('./src/router/notes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/notes', noteRouter)

app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT)
  else
    console.log("Error occurred, server can't start", error);
}
);