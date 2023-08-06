
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/youtubeRegistration",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( ()=> {
    console.log("db connection established");
}).catch( (error) => {
    console.log("error in connection: ", error);
});