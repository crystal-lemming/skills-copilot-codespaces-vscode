// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// set view engine
app.set('view engine', 'ejs');

// connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/commentDB', {useNewUrlParser: true, useUnifiedTopology: true});

// create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
// create model
const Comment = mongoose.model('Comment', commentSchema);

// create routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/postComment', (req, res) => {
    const newComment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    newComment.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/getComments');
        }
    });
});

app.get('/getComments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('getComments', {comments: comments});
        }
    });
});

// listen to port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});