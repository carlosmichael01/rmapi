var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var shop_typesSchema = new mongoose.Schema({
    name : { type: String, default: ''}
});

var shop_types = mongoose.model('shop_types',shop_typesSchema);
module.exports = {shop_types:shop_types}; 