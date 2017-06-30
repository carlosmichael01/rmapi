var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var itemCategoriesSchema = new mongoose.Schema({
    name : { type: String, default: ''}
});

var itemCategories = mongoose.model('item_categories',itemCategoriesSchema);
module.exports = {itemCategories:itemCategories}; 