const mongoose = require("mongoose");

const env = require('../../.env')

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log('Conected to mongodb');
});
mongoose.Promise = global.Promise;

module.exports = mongoose
