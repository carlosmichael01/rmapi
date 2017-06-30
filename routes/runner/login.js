var express = require('express');
var router = express.Router();
var runners_service = require('../../services/runner/runners-service');

router.post('/', function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	runners_service.authUser(email, password, function(data,err){
        if(err){
            res.json("error");
        }
        else{
            res.json(data);
        }
    });
});

function check_status_timeout(timestamp, req){
	setTimeout(function(){
		if(timestamp == sess.timestamp){
			runners_service.updateUserStatus({ body : {
				id: req.body.id,
				status : 0
			}},function(success, err){
			});
		}else{
			runners_service.updateUserStatus({ body : {
				id: req.body.id,
				status : 1
			}},function(success, err){
			});
		}
	}, 20000);
}

var track_timestamp_sess;
router.post('/GPS', function(req, res){
	
	sess = req.session;
	timestamp = Date.now();
	sess.timestamp = timestamp;

	check_status_timeout(timestamp, req);

	runners_service.setGPS(req, function(data,err){
		res.send({success:true});
	});
});


module.exports = router;