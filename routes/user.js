var express = require('express');
var router = express.Router();
module.exports = router;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var User;

var db = mongoose.connection;
db.once('open', function() {
	var userSchema = mongoose.Schema({
		email: String,
		pw: String
	});

	User = mongoose.model('user', userSchema);
});


router.get('/login', function (req, res) {
	res.render('user_login', {
		title: 'LOGIN'
	});
});

router.get('/signup', function (req, res) {
	res.render('user_signup', {
		title: 'SIGN UP'
	});
});



router.post('/login', function(req, res) {
	console.log(req.body);
	User.find({ email: req.body.email }, function(err, docs) {
		if (docs.length == 0) {
			res.json({
				log: '존재하지 않는 아이디입니다'
			});
		}
		else {

			if (docs[0].pw == req.body.pw) {
				res.json({
					log: docs[0].pw
				});
			}
			else {
				res.json({
					log: '비밀번호가 잘못되었습니다'
				});
			}
		}
	});
});

router.post('/signup', function(req, res) {
	console.log(req.body);
	User.findOne({ email: req.body.email }, function(err, doc) {
		if (!doc) {
			if (req.body.pw == req.body.confirm) {
				var user = new User({
					email: req.body.email,
					pw: req.body.pw
				});

				user.save();
				res.json({
					log: '회원가입에 성공하였습니다'
				});	
			}
			else {
				res.json({
					log: '비밀번호를 확인해주세요'
				});
			}
		}
		else {
			res.json({
				log: '이미 사용중인 이메일입니다'
			});
		}
	});
});