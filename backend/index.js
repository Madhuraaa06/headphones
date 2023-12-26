
const express = require('express');
const dbConnection = require('./dbConnection');
const DataRoute = require('./Routes/DataRoute');
const AuthRoute = require('./Routes/Register');

const app = express();
const PORT = 8000;

//database
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
dbConnection.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(express.json());


app.use(DataRoute);
app.use(AuthRoute);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
