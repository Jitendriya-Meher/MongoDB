
const mongoose = require('mongoose');
const validator = require('validator');

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

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      // build in validation
      required: true,
      unique: true,
      lowercase: true,
      trim:true,
      minlength:[2,"Minimum 2 letters"],
      maxlength:30,
    },
    ctype:{
      type:String,
      enum:["Front End", "Back End", "Database"],
      // enum:  Array, creates a validator that checks if the value is in the given array.
    },
    videos:{
        type:Number,

        // custom validation
        validate(value){
            if(value < 0){
                throw new Error("videos count should not be negative");
            }
        }
    },
    author:String,
    email:{
        type:String,
        required:true,
        unique:true,

        // email validator
        validate(value){
            if( validator.isEmail(value) == false){
                throw new Error("Email is not valid");
            }
        }
    },
    active:Boolean,
    data:{
      type:Date,
      default:Date.now
    }
  }
);

const Playlist = new mongoose.model("Playlist",playlistSchema);


// creating document or insert

const createDocument = async () => {

  try{
    
    const javascriptPlaylist = new Playlist({
        name:"JavaScript JS",
        ctype:"Front End",
        videos:150,
        author:"Thapa Technical",
        email:"thapa@go.com",
        active:true
    });

    // insertMany method
    // The insertMany() method in Mongoose is used to insert multiple documents into a MongoDB collection in a single operation. It is a convenient way to insert an array of documents in bulk rather than inserting each document individually.
    
    const result = await Playlist.insertMany([javascriptPlaylist]);

    console.log(result);

  }
  catch(err) {
    console.log("error: " , err);
  }
}
createDocument();
