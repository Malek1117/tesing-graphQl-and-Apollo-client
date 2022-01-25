const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.qvcok.mongodb.net/graphQlTesting?retryWrites=true&w=majority`);
}

module.exports = connect;