var merchants_model = require('../models/merchants-model').merchants;
var shops_model = require('../models/shops-model').shops;
var itemCategories_model = require('../models/item-categories-model').itemCategories;
var cuisines_model = require('../models/cuisines-model').cuisines;
var shop_types_model = require('../models/shop-types-model').shop_types;
var deliveryLocations_model = require('../models/delivery-locations-model').delivery_locations

var mongoose = require('mongoose');

exports.searchMerchant = function(req, next){
	merchants_model.find({name: new RegExp(req.body.search, "i")}).count(function(c_err, count){
		if(c_err){
			return next("error"); 
		}
		 merchants_model.find({name: new RegExp(req.body.search, "i")}).skip(req.body.skip).limit(req.body.limit).exec(function(err, data) {
	   		if (err){
	            return next("error"); 
	        }
         	return next({count:count, data:data});
		});
	});
};

exports.findMerchantShops = function(req, next){
    merchants_model.findById(req.body.merchantid, "id name desc logo address contact contactperson active").lean().exec(function(err, data){
        if (err){
            return next("error"); 
        }
        shops_model.find({merchantid:req.body.merchantid}, "id name desc logo address contact contactperson shop_type coordinate delivery_fee location operating_hours active", function(s_err, s_data){
        	if (s_err){
            	return next("error"); 
        	}
        	data.shops = s_data;
        	return next(data);
        });
    });
};

exports.insertMerchantNameOnly = function(req, next){

	var merchant = new merchants_model({
		name: req.body.merchant_name,
		active : "true",
		created_at: new Date(),
		created_by : "admin"
	});
	merchant.save(function (err, data){
		if (err){
			return next("error");
		}else{
			return next(data);
		}
	});
};

exports.insertMerchant = function(req, next){
	var logo = req.body.logo;
	if(req.file){
		logo = req.file.filename;
	}
	var merchant = new merchants_model({
		name: req.body.name,
		desc: req.body.desc,
		logo: logo,
		address: req.body.address,
		contact : req.body.contact,
		contactperson : req.body.contactperson,
		active : req.body.active,
		created_at: new Date(),
		created_by : "admin"
	});
	merchant.save(function (err, data){
		if (err){
			return next("error");
		}else{
			return next("success");
		}
	});
};

exports.updateMerchant = function(req, next){
	var logo = req.body.old_logo;
	if(req.file){
		logo = req.file.filename;
	}
	merchants_model.findOneAndUpdate({_id:req.body.merchantid},
		{$set:{
			name: req.body.name,
			desc: req.body.desc,
			logo: logo,
			address: req.body.address,
			contact : req.body.contact,
			contactperson : req.body.contactperson,
			active : req.body.active,
			modified_at: new Date(),
			modified_by : "admin"
        }},function (err, data){
	        if(err){
	          return next("error");   
	        }else{
	          return next("success");
	        }
        });
};

exports.insertShop = function(req, next){
	var logo = req.body.logo;
	if(req.file){
		logo = req.file.filename;
	}
	var shop = new shops_model({
		name: req.body.name,
		desc: req.body.desc,
		logo: logo,
		address: req.body.address,
		contact : req.body.contact,
		contactperson : req.body.contactperson,
		shop_type : req.body.shop_type,
		merchantid : req.body.merchantid,
		coordinate : [req.body.lat, req.body.lng],
		delivery_fee: req.body.delivery_fee,
		'location.city': req.body.city,
		'location.state': req.body.state,
		'operating_hours.opening' : req.body.opening,
		'operating_hours.closing' : req.body.closing,
		active : req.body.active,
		created_at: new Date(),
		created_by : "admin"
	});
	shop.save(function (err, data){
		if (err){
			return next("error");
		}else{
			return next("success");
		}
	});
}; 

exports.updateShop = function(req, next){
	var logo = req.body.old_logo;
	if(req.file){
		logo = req.file.filename;
	}
	shops_model.findOneAndUpdate({_id:req.body.shopid},
		{$set:{
			name: req.body.name,
			desc: req.body.desc,
			logo: logo,
			address: req.body.address,
			contact : req.body.contact,
			contactperson : req.body.contactperson,
			shop_type : req.body.shop_type,
			merchantid : req.body.merchantid,
			coordinate : [req.body.lat, req.body.lng],
			delivery_fee: req.body.delivery_fee,
			'location.city': req.body.city,
			'location.state': req.body.state,
			'operating_hours.opening' : req.body.opening,
			'operating_hours.closing' : req.body.closing,
			active : req.body.active,
			modified_at: new Date(),
			modified_by : "admin"
        }},function (err, data){
	        if(err){
	          return next("error");   
	        }else{
	          return next("success");
	        }
        });
};

exports.findShopTypes = function(next){
	shop_types_model.find({}, function(err, data){
		if(err){
			return next("error");
		}
		return next(data);
	});
};

exports.findMerchantList = function(next){
	merchants_model.find({},"name",function(err, data){
		if(err){
			return next("error");
		}
		return next(data);
	});
};


exports.findShopList = function(req, next){
	param = {};
	if(req.body.merchantid != ""){
		param = {merchantid:req.body.merchantid};
	}
	
	shops_model.find(param,"name",function(err, data){
		if(err){
			return next("error");
		}
		return next(data);
	});
};

exports.findProducts = function(req, next){
	query = { 
		'product': { $exists: true, $ne: [] }, 
		'product.name' : {$regex: new RegExp(req.body.search, "i")}
	};
	 if(req.body.shopid != ""){
		query["_id"] = mongoose.Types.ObjectId(req.body.shopid);
	}
	if(req.body.category != ""){
		query["product.category"] = mongoose.Types.ObjectId(req.body.category);
	}
	
	shops_model.aggregate([
			{ $unwind: "$product" },
			{ $match: query},
			{$lookup: {
		          from: "item_categories",
		          localField: "product.category",
		          foreignField: "_id",
		          as: "product.category"
	        }},
			{$project : {
		 		'product' : 1,
			}}
		 ]).exec(function (err, data){
	 		count = data.length;
	 		data = data.slice(req.body.skip, req.body.skip + req.body.limit);
	 		if(err){
				return next(err);
			}
			return next({data: data, count: count});
		 });

};

exports.removeProduct = function(req, next){
	var batch = shops_model.collection.initializeOrderedBulkOp();
	var ids = JSON.parse(req.body.ids);
	ids.forEach(function(data){
	  batch.find({'_id': mongoose.Types.ObjectId(data.shopid)}).update({
	  	$pull : {
	  		'product': { '_id': mongoose.Types.ObjectId(data.productid) }
	  	}
	  });
	});
	batch.execute(function(err){
		if(err){
			return next("error");
		}
		return next("success");
	});
};

exports.insertProduct = function(req, next){
	var image = req.body.old_image;
	if(req.file){
		image = req.file.filename;
	}
	var addon = JSON.parse(req.body.add_on);
	var options = JSON.parse(req.body.options);
	var tags = JSON.parse(req.body.tags);
	shops_model.findByIdAndUpdate(
		req.body.shopid,
		{$push: {
			"product" : {
				image: image,
			    category: req.body.category,
			    prep_timeto: req.body.prep_timeto,
			    prep_timefrom: req.body.prep_timefrom,
			    discount: req.body.discount,
			    promo_start: req.body.promo_start,
			    promo_end: req.body.promo_end,
			    desc: req.body.desc,
			    name: req.body.name,
			    tags: tags,
			    add_on: addon,
			    options: options,
			    cuisine: req.body.cuisine,
			    dine_price: req.body.dine_price,
			    cost_price: req.body.cost_price,
			    selling_price: req.body.selling_price,
			    free_delivery: req.body.free_delivery,
			    created_at: new Date(),
			    created_by: "Admin"
			}

		}})
		.exec(function(err, data){
			if(err){
				return next("error");
			}
			return next("success");
		});
};

exports.updateProduct = function(req, next){
	var image = req.body.old_image;
	if(req.file){
		image = req.file.filename;
	}
	var addon = JSON.parse(req.body.add_on);
	var options = JSON.parse(req.body.options);
	var tags = JSON.parse(req.body.tags);
	shops_model.findOneAndUpdate({_id:req.body.shopid, "product._id": req.body.productid },
		{$set:{
			"product.$.image": image,
		    "product.$.category": req.body.category,
		    "product.$.prep_timeto": req.body.prep_timeto,
		    "product.$.prep_timefrom": req.body.prep_timefrom,
		    "product.$.discount": req.body.discount,
		    "product.$.promo_start": req.body.promo_start,
		    "product.$.promo_end": req.body.promo_end,
		    "product.$.desc": req.body.desc,
		    "product.$.name": req.body.name,
		    "product.$.tags": tags,
		    "product.$.add_on": addon,
		    "product.$.options": options,
		    "product.$.cuisine": req.body.cuisine,
		    "product.$.dine_price": req.body.dine_price,
		    "product.$.cost_price": req.body.cost_price,
		    "product.$.selling_price": req.body.selling_price,
		    "product.$.free_delivery": req.body.free_delivery,
			"product.$.modified_at": new Date(),
			"product.$.modified_by" : "admin"
        }})
        //,{new: true}).populate('product.category')
		.exec(function(err, data){
			if(err){
				return next("error");
			}
			return next("success");
		});
};

exports.findItemCategories = function(next){
	itemCategories_model.find({}, function(err, data){
		if(err){
			return next('error');
		}
		return next(data);
	});
};

exports.findCuisines = function(next){
	cuisines_model.find({}, function(err, data){
		if(err){
			return next('error');
		}
		return next(data);
	});
};

exports.findDeliveryLocations = function(next){
	deliveryLocations_model.find({}, function(err, data){
		if(err){
			return next('error');
		}
		return next(data);
	});
};