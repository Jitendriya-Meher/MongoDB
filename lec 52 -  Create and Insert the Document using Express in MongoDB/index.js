
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

    // save method
    // In Mongoose, the save() method is used to save a document (object) to the MongoDB database. It is a method available on individual Mongoose model instances, and it's typically used when you want to save an individual document with changes or create a new document.

    // reactPlaylist.save();
    // return promise

    const result = await reactPlaylist.save();
    console.log(result);
  }
  catch(err) {
    console.log("error: " , err);
  }
}
createDocument();

