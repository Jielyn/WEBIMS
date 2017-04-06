module.exports = {
    authentication: function authentication(req,res,next){
        if(!req.session.user){
            return res.redirect("/");
        }
        next();
    },


    checkUser : function(req,res,next) {
        if(req.session.user){
            return res.redirect('/chatSystem');
        }
        next();
    }
};