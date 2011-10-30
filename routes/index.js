var _ = require('underscore');

var people = [
  { 
    name: 'Lucas', 
    notes: ['Juega a la petanca', 'Le gusta el atún'] 
  },
  {
    name: 'Hortensia',
    notes: ['Es jardinera', 'Tiene un gato', 'Habla alto']
  }
];


/*
 * GET home page.
 */

exports.index = function(req, res) {
  var names = people.map(function(p) { return p.name; });
  res.render('index', { title: 'My Friends', names: names })
};

exports.person = function(req, res) {
  var notes = _(people).detect(function (p) { 
    return p.name == req.params.name;
  }).notes;
  res.json(notes);
}

exports.addNote = function(req, res) {
  var data = req.body;
  var person = _(people).detect(function(p) {
    return p.name == data.name;
  });
  
  person.notes.push(data.note);
  
  console.log('New note for ' + person.name + ': ' + data.note);
  
  res.json({status: 'ok' });
}
