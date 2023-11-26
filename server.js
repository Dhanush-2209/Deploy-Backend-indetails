// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors()); // Use the cors middleware

mongoose.connect('mongodb+srv://dhanushreddy2209:12345@cluster0.zmjy38r.mongodb.net/IndividualInfo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

const individualRoutes = require('./routes/individualRoutes');
app.use('/api/individual', individualRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
