var transactions_model = require('../models/transactions-model').transactions;
var shops_model = require('../models/shops-model').shops;

exports.findTaskByShopId = function(req, next){
    var query = {};
    var status = {};
    var task_query = 1;
    status.$in = req.body.status;
    query.status = status;
    if (req.body.shopid != "") {
    	query.shop_id = req.body.shopid;
        task_query = {$elemMatch:query}
    }
   
	transactions_model.find({task: {$elemMatch: query }})
    .select({
        user_id:1,
        runner_id: 1,
        delivery_time: 1,
        transaction_id : 1,
        task:task_query,
    }).populate('user_id').populate('runner_id').exec(function(err, data){
        if (err){
            return next("error");
        }
        return next(data);
    });
}

exports.findTaskByArea = function(req, next){
	if(req.body.state != "" && req.body.city != ""){
	    shops_model.find({ 'location.city' : req.body.city }, function(err, shop_data) {
	        if (err){
	            return next("error");
	        }
	        else{
	            var shop_ids = [];
	            shop_data.forEach(function(shop){
	                shop_ids.push(shop._id);
	            });
	            transactions_model.find( { 'task' : { $elemMatch : {
	                shop_id: { $in : shop_ids },
	                status: {$in : req.body.status}
	            }}}).populate('user_id').populate('runner_id').exec(function(err, data){
	                if (err){
	                    return next("error");
	                }
	                return next(data);
	            });
	        }
	    });
    }
    else if(req.body.state != "" && req.body.city == ""){
    	shops_model.find({ 'location.state' : req.body.state }, function(err, shop_data) {
    		if (err){
	            return next("error");
	        }
	        else{
	            var shop_ids = [];
	            shop_data.forEach(function(shop){
	                shop_ids.push(shop._id);
	            });
	            transactions_model.find( { 'task' : { $elemMatch : {
	                shop_id: { $in : shop_ids },
	                status: {$in : req.body.status}
	            }}}).populate('user_id').populate('runner_id').exec(function(err, data){
	                if (err){
	                    return next("error");
	                }
	                return next(data);
	            });
	        }

		});
    }
    else{
    	transactions_model.find( { 'task' : { $elemMatch : {
            status: {$in : req.body.status}
        }}}).populate('user_id').populate('runner_id').exec(function(err, data){
            if (err){
                return next("error");
            }
            return next(data);
        });
    }
}


exports.updateTaskStatus = function(req, next){
    transactions_model.findOneAndUpdate({"_id":req.body.transactionid, "task._id":req.body.taskid},
    {$set:{
        "task.$.status":req.body.status
    }},function (err,data){
        if(err){
            return next("error");
        }
        return next("success");
    });
}

exports.updateItemStatus = function(req, next){
    transactions_model.findOne({_id:req.body.transactionid}, function(err, data){
        data.task.forEach(function(task){
           if(task.id == req.body.taskid){
                task.item.forEach(function(item){
                    if(item.item_id == req.body.item_id){
                        item.status = req.body.status;
                    }
                });
           }
        });
        data.save(function (err, data) {
            if(err){
                return next("error");
            }
            return next("success");
        });
    });
};

exports.findTransaction = function(req, next){
    transactions_model.findById(req.body.transactionid, function(err, data){
        if (err){
            return next("error");
        }
        return next(data);
    });
};

var mongoose = require('mongoose');

exports.updateRunner = function(req, next){
   transactions_model.findOneAndUpdate({"_id": mongoose.Types.ObjectId(req.body.transactionid)},
    {$set:{
        "runner_id":req.body.runner
    }},function (err,data){
        if(err){
            return next("error");
        }
        return next("success");
    });
}