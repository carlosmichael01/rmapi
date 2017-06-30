var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;


var cuisinesSchema = new mongoose.Schema({
    name : { type: String, default: ''},
    sort: { type: Number, default: ''}
});

var cuisines =  mongoose.model('cuisines',cuisinesSchema);
module.exports = {cuisines:cuisines}; 