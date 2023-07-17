// create web server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// set static path
app.use(express.static(path.join(__dirname, 'public')));
// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// set up mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  name: String,
  comment: String
});
const Comment = mongoose.model('Comment', CommentSchema);
// routes
app.get('/', (req, res) => {
  res.render('index');
});
app.post('/post', (req, res) => {
  const newComment = new Comment(req.body);
  newComment.save((err, doc) => {
    if (err) {
      res.json(err);
    } else {
      res.redirect('/get');
    }
  });
});
app.get('/get', (req, res) => {
  Comment.find((err, doc) => {
    if (err) {
      res.json(err);
    } else {
      res.render('comments', {comments: doc});
    }
  });
});
app.listen(3000, () => {
  console.log('server started on port 3000');
});