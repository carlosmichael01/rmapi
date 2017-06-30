var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var runnersSchema = new mongoose.Schema({
    fname: { type: String, default: ''},
    lname: { type: String, default: ''},
    email: {type:String, required:true, unique:true},
    address: { type: String, default: ''},
    city: { type: String, default: ''},
    state: { type: String, default: ''},
    contact: { type: String, default: ''},
    password: { type: String, default: ''},
    merchantid : ObjectId,
    plate: { type: String, default: ''},
    bank: { type: String, default: ''},
    photo: { type: String, default: 'default.png'},
    gender: { type: String, default: ''},
    active : {type:Boolean, default:false},
    created_at: {type:Date,default:Date.now},
    created_by: String,
    modified_at: Date,
    modified_by: String,
    status: { type: Number, default: 0},
    rating: { type: Number, default: 0},
    earning: { type: Number, default: 0},
    task: { type: Number, default: 0},
    last_rating : { type: Number, default: 0},
    last_earning : { type: Number, default: 0},
    last_task : { type: Number, default: 0},
    last_datetime : {type:Date,default: ''},
    last_location : { type: String, default: ''},
    coordinates : {
        lat: { type: Number, default: ''},
        lng: { type: Number, default: ''}
    }
});

var runners = mongoose.model('runners',runnersSchema);

module.exports={runners:runners};