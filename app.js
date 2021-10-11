const express = require('express');
const http = require('http');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/"));
app.set('view engine', 'ejs');
const productRoutes = require('./api/routes/products')

app.use('/products',productRoutes);

app.get('/', function(req, res){
    
    res.render('index');
    
})

app.post('/',function(req, res){
    var category = req.body.category;
    category = 'http://localhost:3000/products/' + category;
    http.get(category)
    res.render("index")
})

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
