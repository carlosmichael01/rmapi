var mongoose = require('mongoose');
	mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var promotionsSchema = new mongoose.Schema({
	code : String,
	shop_id: {type: ObjectId, ref: 'shops'},
	shop_name : String,
	name : String,
	discount : Number,
	start_date : Date,
	end_date : Date,
	active : {type:Boolean, default:false},
    created_at: {type:Date,default:Date.now},
    created_by: String,
    modified_at: Date,
    modified_by: String,
});

var promotions = mongoose.model('promotions',promotionsSchema);

module.exports={promotions:promotions};