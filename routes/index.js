var websites = [
  {id: 1, url: "http://example.com/1", title: "example.com"},
  {id: 2, url: "http://example.org/1", title: "example.org"}
];

exports.index = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.sites = function(req, res) {
  res.send(websites);
};
