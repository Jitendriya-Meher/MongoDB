
// first -> npm install mongoose

// Require Mongoose: In your Node.js file where you want to use Mongoose, require it at the beginning of the file.
const mongoose = require('mongoose');


// Connect to the Database: Use the mongoose.connect() method to establish a connection to your MongoDB database. You can pass the connection string as the first argument.

mongoose.connect("mongodb://127.0.0.1:27017/ttchanell", { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    console.log("connect to the database successfllly !!!");
})
.catch( (err) => {
    console.log("error: " , err);
});

// const dbURI = 'mongodb://localhost:27017/ttchanell'; // Replace with your MongoDB connection string
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to the database!');
//   })
//   .catch((err) => {
//     console.error('Error connecting to the database:', err);
//   });