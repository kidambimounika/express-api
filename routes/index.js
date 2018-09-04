var express = require('express');
var router = express.Router();
var User = require('../model/userModel');
var md5 = require('js-md5');

router.get('/',function(req,res,next){
  res.render('index',{ title:'Express'});

});
router.post('/signin',function(req,res,next){
  console.log(req.body);
  var email = req.body.email;
  var password = md5(req.body.password);
  User.find({'email':email,'password':password},function(err,user){
    console.log("-------------------"+user)
    if(err){
      res.json({code: 200, error: err});

    }else if (user.length<1){
      res.json({code:200,error: {msg:"invalid userid orpassword"}});

    }else{
      res.json({code:200,data:user});

    }
    
  });
});
router.post('/singup',function(req,res,next){
  console.log(req.body);
  var usermodel= new user();
  userModel.name=req.body.name;
  userModel.email=req.body.email;
  userModel.createAt=new Date();
  usermodel.save(function(err,user){
    console.log(JSON.stringify(user));
    if(err){
      res.json({code:200,error:err});
  
    }else{
      res.json({code:200,data:user});

    }
  });
});
module.exports=router;