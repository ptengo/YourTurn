var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StoreSchema   = new Schema({
    name: String,
    users: [{type: Schema.ObjectId, ref: "User"}],
    storeTurn: Number,
    usersTurn: Number,
    //idqr: String
});

module.exports = mongoose.model('Store', StoreSchema);
