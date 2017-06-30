var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var locationSchema = new mongoose.Schema({
	name: { type: String, default: ''},
	cities : { type: Array, default: []},
	sort : { type: Number, default: ''}
});

var delivery_locations = mongoose.model('delivery_locations',locationSchema);
module.exports={delivery_locations:delivery_locations}; 