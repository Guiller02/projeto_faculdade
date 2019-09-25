const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/faculdade", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log('Conected to mongodb');
});
mongoose.Promise = global.Promise;

module.exports = mongoose