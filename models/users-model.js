var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var usersSchema = new mongoose.Schema({
    fname: { type: String, default: ''},
    lname: { type: String, default: ''},
    email: {type:String, required:true, unique:true},
    address: { type: String, default: ''},
    contact: { type: String, default: ''},
    password: { type: String, default: ''},
    merchantid : { type: ObjectId, default: null},
    photo: { type: String, default: 'default.png'},
    user_type: { type: String, default: 'user'},
    role_type: { type: String, default: 'normal'},
    active : {type:Boolean, default:false},
    created_at: {type:Date,default:Date.now},
    created_by: String,
    modified_at: Date,
    modified_by: String
});

var users = mongoose.model('users',usersSchema);

module.exports={users:users};