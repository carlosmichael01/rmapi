var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var merchantsSchema = new mongoose.Schema({
    name : { type: String, default: ''},
    desc : { type: String, default: ''},
    logo : { type: String, default: 'default.png'},
    address : { type: String, default: ''},
    contact: { type: String, default: ''},
    contactperson : { type: String, default: ''},
    active : {type:Boolean, default:false},
    created_at: {type:Date,default:Date.now},
    created_by: String,
    modified_at: Date,
    modified_by: String
});

var merchants = mongoose.model('merchants',merchantsSchema);
module.exports={merchants:merchants}; 