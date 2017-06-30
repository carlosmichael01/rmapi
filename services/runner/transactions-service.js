var transactions_model = require('../../models/transactions-model').transactions;

exports.findAllTask = function(next){
    transactions_model.find(function(cerr,data){
        if (cerr){
            return next(data, cerr); 
        }else{
         next(data, cerr);
        }
    });
};

exports.findRunnerTask = function(req, next){
   transactions_model.find({runner_id:req.body.id, "task.status":{$in:req.body.status}}).populate('user_id').exec(function(err, data){
        if (err){
            return next("error");
        }
        return next(data);
    });
};

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
};

exports.updateAllTaskStatus = function(req, next){
    transactions_model.findOne({"_id":req.body.transactionid}, function(err, data){
        data.task.forEach(function(task){
            task.status = req.body.status;
        });
        data.save(function(err, data){
            if(err){
                return next("error");
            }
            return next("success");
        });
    });
};

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
}

