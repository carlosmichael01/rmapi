var promotions_model = require('../models/promotions-model').promotions;
var shops_model = require('../models/shops-model').shops;
var mongoose = require('mongoose');

// exports.listPromotion = function(req, next){
// 	promotions_model.find({active: true}).exec(function(err, data){
// 		if (err){
// 			return next("error");
// 		}else{
// 			return next(data);
// 		}
// 	});
// };

exports.searchPromotion = function(req, next){
	var query = { name: new RegExp(req.body.search, "i") };
	if(req.body.shopid != ""){
		query.shop_id = req.body.shopid
	}
	promotions_model.find(query).count(function(c_err, count){
		if(c_err){
			return next("error"); 
		}
		 promotions_model.find(query).skip(req.body.skip).limit(req.body.limit).exec(function(err, data) {
	   		if (err){
	            return next("error"); 
	        }
         	return next({count:count, data:data});
		});
	});
};

exports.insertPromotion = function(req, next){
	var promotion = new promotions_model({
		shop_id: req.body.shop_id,
		shop_name: req.body.shop_name,
		name: req.body.name,
		start_date: req.body.start_date,
		end_date: req.body.end_date,
		discount : req.body.discount,
		active : req.body.active,
		created_at: new Date(),
		created_by : "admin"
	});
	promotion.save(function (err, data){
		if (err){
			return next("error");
		}else{
			shops_model.findOne({'_id': req.body.shop_id}, function(err, shop_data) {
				if (err){
					return next("error");
				}else{
					shop_data.product.forEach(function(product){
						product.discount = req.body.discount;
						product.promo_start = req.body.start_date;
						product.promo_end = req.body.end_date;
					});
					shop_data.save(function (err){
						if (err){
							return next("error");
						}else{
							return next("success");
						}
					});
					
				}
			});
		}
	});
};

exports.insertPromotionCode = function(req, next){
	var promotion = new promotions_model({
		code: req.body.code,
		name: req.body.name,
		start_date: req.body.start_date,
		end_date: req.body.end_date,
		discount : req.body.discount,
		active : req.body.active,
		created_at: new Date(),
		created_by : "admin"
	});
	promotion.save(function (err, data){
		if (err){
			return next("error");
		}else{
			return next("success");
		}
	});
};

exports.updatePromotion = function(req, next){
	promotions_model.findOneAndUpdate({_id:req.body.id},
		{$set:{
			shop_id: req.body.shop_id,
			shop_name: req.body.shop_name,
			name: req.body.name,
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			discount : req.body.discount,
			active : req.body.active,
			modified_at: new Date(),
			modified_by : "admin"
        }},function (err, data){
	        if(err){
	          return next("error");   
	        }else{
		          shops_model.findOne({'_id': req.body.shop_id}, function(err, shop_data) {
					if (err){
						return next("error");
					}else{
						shop_data.product.forEach(function(product){
							product.discount = req.body.discount;
							product.promo_start = req.body.start_date;
							product.promo_end = req.body.end_date;
						});
						shop_data.save(function (err){
							if (err){
								return next("error");
							}else{
								return next("success");
							}
						});
						
					}
				});
	        }
        });
};

exports.updatePromotionCode = function(req, next){
	promotions_model.findOneAndUpdate({_id:req.body.id},
		{$set:{
			code: req.body.code,
			name: req.body.name,
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			discount : req.body.discount,
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

exports.removePromotion = function(req, next){
	if(JSON.parse(req.body.shopids).length <= 0){
		var ids = JSON.parse(req.body.promotionids);
		promotions_model.find({
		'_id': { $in: ids }
		}).remove(function(err, data){
		   if (err){
		     return next("error"); 
		   }else{
		   	return next("success");
		   }
		});

	}else{
		var shopids = JSON.parse(req.body.shopids);
		var ids = JSON.parse(req.body.promotionids);
		shops_model.find({
	    	'_id': { $in: shopids }
		}, function(err, shops){
		     if(err){
		  		return next("error");
		  	}else{
		  		var shops_count = shops.length;
		  		var loop_count = 0;
		  		shops.forEach(function(shop_data){
		  			
				  	shop_data.product.forEach(function(product){
						product.discount = 0;
						product.promo_start = null;
						product.promo_end = null;
					});
					shop_data.save(function (s_err){
						loop_count++;
						if(loop_count >= shops_count){
							promotions_model.find({
							'_id': { $in: ids }
							}).remove(function(err, data){
							   if (err){
							     return next("error"); 
							   }else{
							   	return next("success");
							   }
							});
						}
					});
					
						
		  		});
			}
		});
	}
};