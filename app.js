// packages
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// app config
mongoose.connect('mongodb://localhost/blog_app', {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// schema config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

// model config
var Blog = mongoose.model('Blog', BlogSchema);

// restful routes


// server config
app.listen(3000, function() {
    console.log('Server is running!');
});