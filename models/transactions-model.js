var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var transactionsSchema = new mongoose.Schema({
    user_id: {type: ObjectId, ref: 'users'},
    runner_id: {type: ObjectId, ref: 'runners'},
    eta: { type: Number, default: ''},
    comments: { type: String, default: ''},
    transaction_date: {type:Date,default:Date.now},
    transaction_id: {type:String,default:""},
    status: { type: Number, default: ''},
    sessionid : { type: String, default: ''},
    payment : {
        amount : { type: Number, default: ''},
        reference_no : { type: String, default: ''},
        mode : { type: String, default: ''}
    },
    delivery_time: {
        schedule: { type: String, default: ''},
        date: { type: String, default: ''},
        time: { type: String, default: ''},
    },
    address : {
        postcode : { type: String, default: ''},
        city : { type: String, default: ''},
        street : { type: String, default: ''}
    },
    coordinate : {
        lat : { type: Number, default: ''},
        lng : { type: Number, default: ''}
    },
    contact : {
        number : { type: String, default: ''},
        email : { type: String, default: ''},
        lname : { type: String, default: ''},
        fname : { type: String, default: ''}
    },
    task: [{
        transaction_type : { type: String, default: ''},
        shop_id: ObjectId,
        shop_name: { type: String, default: ''},
        shop_address : { type: String, default: ''},
        status: { type: Number, default: ''},
        shop_coordinate : {
            lat : { type: Number, default: ''},
            lng : { type: Number, default: ''}
        },
        item:[{
            item_id : ObjectId,
            item_name : { type: String, default: ''},
            item_desc : { type: String, default: ''},
            item_estimage: { type: Number, default: ''},
            item_image: { type: String, default: ''},
            instruction : { type: String, default: ''},
            quantity: { type: Number, default: ''},
            merchant_cost: { type: Number, default: ''},
            status: { type: Number, default: ''},
            remarks: { type: String, default: ''},
            add_on : [{
                name : { type: String, default: ''},
                quantity : { type: Number, default: ''}
            }]
        }]
    }]
});

var transactions = mongoose.model('transactions',transactionsSchema);

module.exports={transactions:transactions};