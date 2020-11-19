const express = require('express');
const connectDB = require('./config/db');
const app = express();
// app.use(express.json());

// connect to the database check /config/db
connectDB();

// crete test route to see if we get response from the server
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/reservations', require('./routes/api/reservations'));

// initialize the port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
