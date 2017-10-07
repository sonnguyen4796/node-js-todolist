var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://chien.than:test-nosql-db@ds013495.mlab.com:13495/test-nosql');

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'get milk'}, {item: 'get food'}, {item: 'kick some coding ass'}];
var urlencodeParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
  // get data from mongodb and pass it to view
  Todo.find({}, function(err, data){
    if (err) throw err;
    res.render('todo', {todos: data});
  });
});

app.post('/todo', urlencodeParser, function(req, res){
  // get data from the view and add it to mongodb
  var newTodo = Todo(req.body).save(function(err, data){
    if (err) throw err;
    res.json(data);
  })
});

app.delete('/todo/:item', function(req, res){
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

};
