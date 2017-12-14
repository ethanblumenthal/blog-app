// packages
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override');

// app config
mongoose.connect('mongodb://localhost/blog_app', {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// schema config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

// model config
var Blog = mongoose.model('Blog', blogSchema);

// root redirect
app.get('/', function(req, res) {
    res.redirect('/blogs');
});

// index routes
app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});

// new route
app.get('/blogs/new', function(req, res) {
    res.render('new');
});

// create route
app.post('/blogs', function(req, res) {
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render('new');
        } else {
            res.redirect('/blogs')
        }
    });
});

// show route
app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
    })
});

// edit route
app.get('/blogs/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: foundBlog});
        }
    });
});

// update route
app.put('/blogs/:id', function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);
        }
    });
});

// server config
app.listen(3000, function() {
    console.log('Server is running!');
});