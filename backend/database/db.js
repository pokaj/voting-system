const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@cluster0.kjc0d.mongodb.net/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`,
            {
                useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true, useFindAndModify:false
            });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;