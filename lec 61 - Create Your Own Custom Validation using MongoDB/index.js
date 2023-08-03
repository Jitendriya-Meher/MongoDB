
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
      const reactPlaylist = new Playlist({
        name:"React JS",
        ctype:"Front End",
        videos:80,
        author:"Thapa Technical",
        active:true
    });

    const javascriptPlaylist = new Playlist({
        name:"JavaScript JS",
        ctype:"Front End",
        videos:150,
        author:"Thapa Technical",
        active:true
    });

    const mongoosePlaylist = new Playlist({
        name:"MongoDB",
        ctype:"Back End",
        videos:50,
        author:"Thapa Technical",
        active:true,
    });

    const expressPlaylist = new Playlist({
        name:"Express JS",
        ctype:"Front End",
        // videos:-5,
        videos:20,
        author:"Thapa Technical",
        active:true
    });

    // insertMany method
    // The insertMany() method in Mongoose is used to insert multiple documents into a MongoDB collection in a single operation. It is a convenient way to insert an array of documents in bulk rather than inserting each document individually.
    
    const result = await Playlist.insertMany([reactPlaylist,javascriptPlaylist,mongoosePlaylist,expressPlaylist]);

    console.log(result);
  }
  catch(err) {
    console.log("error: " , err);
  }
}
createDocument();
