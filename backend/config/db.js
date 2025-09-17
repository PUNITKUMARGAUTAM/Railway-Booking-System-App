const mongoose = require('mongoose');

const connectDB = async() => {

    try {

    

    await mongoose.connect(process.env.mongo_uri, {

        useNewUrlParser : true,
        useUnifiedTopology : true
    });

    console.log('Database connected successfully');
}
catch(err)
{
    console.log("Database connection failed");
}
}

module.exports = connectDB;