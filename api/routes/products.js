
const express = require('express');
const mongoose = require('mongoose');
const routes = express.Router();

mongoose.connect("mongodb://localhost:27017/shopDB")


const shopSchema = mongoose.Schema({
    name: String
})

const shop = mongoose.model('products', shopSchema);

routes.get('/', function (req, res, next) {
    var list = [];
    shop.find({},{name: 1, _id: 0},function(err, shop) {
        if(err){
            res.json(err);
        }
        else {
            res.json(shop);
        }
    });

});

routes.get('/items', function (req, res, next) {
    const product = req.query.product;
    shop.find({name:product},{subproducts: {name: 1}, _id: 0}, function(err, shop) {
        if(err){
            res.json(err);
        }
        else {
            res.json(shop);
        }
    })
})

routes.get('/:category', function (req, res, next) {
    const category = req.params.category;
    const cate = new shop({
        name: category,
    })
    cate.save(function(err){
        if(err) {
            res.json(err);
        }
        else {
            res.json({
                message: "Record Inserted"
            });
        }
    });
});


module.exports = routes;