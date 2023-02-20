
require('dotenv').config({ path: './.env' });
const express = require('express');
const noteRouter = require('./src/router/noteRouter');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { errorResponder, errorLogger } =
  require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan(':date[clf] :method :url :status - :response-time ms'));
app.use('/api/notes', noteRouter);
app.use(errorLogger);
app.use(errorResponder);

startServer();

async function startServer() {
  await mongoose
      .connect(`${process.env.MONGO_DB_CONNECTION}/${process.env.DB_NAME}`);
  app.listen(PORT, (error) => {
    if (!error) {
      console.log(`Server is Successfully Running, ` +
         `and App is listening on port ${PORT}`);
    } else {
      console.log('Error occurred, server can\'t start', error);
    }
  },
  );
}
