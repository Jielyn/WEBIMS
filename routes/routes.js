/**
 * Created by Lin on 2017/3/28.
 */
var baseMange = require("../models/baseModels");



module.exports = function (app,db) {

    app.get('/login',function (req,res) {
        //var data = req.body;
        //baseMange.login(db,res,data);
        res.end('login');

    });

    /*app.post('',function (req,res) {
        
    });*/


};