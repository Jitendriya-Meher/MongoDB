
const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/ttchanell';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


// In Mongoose, a schema is a blueprint that defines the structure of the documents (objects) in a MongoDB collection. It allows you to define the properties, types, and validation rules for each field in a document. Once you have defined a schema, you can create a model based on that schema, which represents a collection in the database and provides an interface to interact with the data in that collection.

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
    data:{
      type:Date,
      default:Date.now
    }
  }
);

// Now that we've defined the schema and created a model based on it, we can use the model to perform CRUD (Create, Read, Update, Delete) operations on the "User" collection.

const Playlist = new mongoose.model("Playlist",playlistSchema);