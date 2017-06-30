var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var productsSchema = new mongoose.Schema({
    image: { type: String, default: 'default.png'},
    category: {type: ObjectId, ref: 'item_categories'},
    prep_timeto: { type: Number, default: ''},
    prep_timefrom: { type: Number, default: ''},
    discount: { type: Number, default: 0},
    promo_start: {type:Date,default: ''},
    promo_end: {type:Date,default: ''},
    dine_price: { type: Number, default: 0},
    cost_price: { type: Number, default: 0},
    selling_price: { type: Number, default: 0},
    cuisine: { type: String, default: ''},
    desc: { type: String, default: ''},
    name: { type: String, default: ''},
    free_delivery: {type:Boolean, default:false},
    tags: { type: Array, default: []},
    add_on: [{
        id: ObjectId,
        price: { type: Number, default: 0},
        cost_price: { type: Number, default: 0},
        name: { type: String, default: ''}
    }],
    review: { type: Array, default: []},
    options: [{
        id: ObjectId,
        price: { type: Number, default: 0},
        cost_price: { type: Number, default: 0},
        name: { type: String, default: ''}
    }],
    avail : {type:Boolean, default:true},
    created_at: {type:Date,default:Date.now},
    created_by: String,
    modified_at: Date,
    modified_by: String,
});

var shopsSchema = new mongoose.Schema({
    name : { type: String, default: ''},
    desc : { type: String, default: ''},
    logo : { type: String, default: 'default.png'},
    address : { type: String, default: ''},
    contact: { type: String, default: ''},
    contactperson : { type: String, default: ''},
    coordinate : { type: Array, default: []},
    shop_type: { type: String, default: ''},
    merchantid: ObjectId,
    active : {type:Boolean, default:false},
    created_at: {type:Date,default:Date.now},
    created_by: String,
    modified_at: Date,
    modified_by: String,
    delivery_fee : { type: Number, default: ''},
    location:{
        state: { type: String, default: ''},
        city: { type: String, default: ''}
    },
    operating_hours : {
        opening: { type: String, default: ''},
        closing: { type: String, default: ''}
    },
    product: [productsSchema]
});


var shops = mongoose.model('shops',shopsSchema);
module.exports={shops:shops}; 