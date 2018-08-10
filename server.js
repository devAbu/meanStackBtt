var express = require('express')
var app = express()
var port = process.env.PORT || 3000

var mongojs = require('mongojs')
var db = mongojs('localhost:27017/btt', ['tour'])

var body_parser = require('body-parser')
app.use(body_parser.json())

var urlencodedParser = body_parser.urlencoded({
  extended: false
})

app.use(express.static(__dirname + '/static'))

app.get('/tours', function (req, res) {
  db.tour.find(function (err, docs) {
    res.json(docs)
  })
})

app.post('/addTour', urlencodedParser, function (req, res, next) {
  var item = {
    name: req.body.tourName,
    city: req.body.tourCity,
    description: req.body.tourDescription,
    image: req.body.tourImage
  }

  console.log(item)


  db.tour.insert(item, function (err, docs) {
    console.log('inserted')
  })

})

/* app.post('/deleteTour/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
    var name= req.body.tourName
    var city= req.body.tourCity
    var description= req.body.tourDescription
    var image= req.body.tourImage

  console.log(name)
  console.log(city)
  console.log(description)
  console.log(image)
  
})
 */

app.delete('/deleteTour/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.tour.remove({
    _id: mongojs.ObjectId(id)
  }, function (err, doc) {
    res.json(doc);
  });
});




app.listen(port, function () {
  console.log('Node app is running on port', port)
})