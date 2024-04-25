const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');
const enrollRouter =require('./router/enrollRouter');
const cors = require('cors');
const app = express();


const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://yogalakshmi9496:JbXZvwrM8OsxdUa7@health-temp-db.jn5sij4.mongodb.net/?retryWrites=true&w=majority&appName=Health-temp-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection event
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  // Error event
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

app.use('/user', userRouter);
app.use('/enroll', enrollRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
