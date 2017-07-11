exports.auth = function(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.status(401).send({success: false, msg: "UNAUTHORIZED"});
    }
}
exports.unauth = function(req,res,next){
    if(!req.session.user){
        next();
    }else{
        res.status(401).send({success: false, msg: "AUTHORIZED"});
    }
}