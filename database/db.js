const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://User1:${process.env.MONGO_PASSWORD}@cluster0-n88gy.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
{useNewUrlParser: true,useUnifiedTopology:true},
()=> {
    console.log('connected to db ');
});

