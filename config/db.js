const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected:\n--> Host: ${conn.connection.host}\n--> Database: ${conn.connection.db.databaseName}`)
    } catch(err) {
        console.log(`Error: ${err.messages}`);
        process.exit(1);
    }
}

module.exports = connectDB;