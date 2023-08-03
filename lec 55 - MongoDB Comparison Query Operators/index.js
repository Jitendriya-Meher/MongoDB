

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
        active:true
    });

    const expressPlaylist = new Playlist({
        name:"Express JS",
        ctype:"Front End",
        videos:20,
        author:"Thapa Technical",
        active:true
    });

    // insertMany method
    // The insertMany() method in Mongoose is used to insert multiple documents into a MongoDB collection in a single operation. It is a convenient way to insert an array of documents in bulk rather than inserting each document individually.
    
    const result = await Playlist.insertMany([reactPlaylist,javascriptPlaylist,mongoosePlaylist,expressPlaylist]);

    // console.log(result);
  }
  catch(err) {
    console.log("error: " , err);
  }
}
createDocument();


// Read
const getDocument = async ()=>{

    try{

        // advance find method

        // videos == 50
        // $eq
        // Matches values that are equal to a specified value.
        const result1 = await Playlist
        .find({videos:50})
        .select({name:1,videos:1});

        console.log("\nresult 1 : " , result1);

         // videos >= 50
         	// gte
         // Matches values that are greater than or equal to a specified value.
         const result2 = await Playlist
         .find({videos:{ $gte:50}})
         .select({name:1,videos:1});
 
         console.log("\nresult 2 : " , result2);

          // videos > 50
          // gt
        //   Matches values that are greater than a specified value.
          const result3 = await Playlist
          .find({videos:{ $gt:50}})
          .select({name:1,videos:1});
  
          console.log("\nresult 3 : " , result3);

          // videos <= 50
          // $lte
        //   Matches values that are less than or equal to a specified value.
         const result4 = await Playlist
         .find({videos:{ $lte:50}})
         .select({name:1,videos:1});
 
         console.log("\nresult 4 : " , result4);

         // $in
        //  Matches any of the values specified in an array.
         const result5 = await Playlist
         .find({videos:{ $in:[50,20]}})
         .select({name:1,videos:1});
 
         console.log("\nresult 5 : " , result5);

         // $nin
        //  Matches none of the values specified in an array.
        const result6 = await Playlist
         .find({videos:{ $nin:[50,20]}})
         .select({name:1,videos:1});
 
         console.log("\nresult 6 : " , result6);

    }
    catch (e) {
        console.log("error: ",e);
    }
}

getDocument();