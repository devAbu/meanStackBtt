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
    console.log(docs)
    res.json(docs)
  })
})

app.post('/tours', urlencodedParser, function (req, res, next) {
  console.log(req.body)

  db.tour.insert(req.body, function (err, docs) {
    console.log('inserted')
    res.json(docs)
  })
})

app.delete('/deleteTour/:id', function (req, res) {
  var id = req.params.id
  console.log(id)
  db.tour.remove({
    _id: mongojs.ObjectId(id)
  }, function (err, doc) {
    res.json(doc)
  })
})

app.get('/tours/:id', urlencodedParser, function (req, res) {
  var id = req.params.id
  console.log(id)
  db.tour.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc)
  })
})

app.put('/tours/:id', function (req, res) {
  var id = req.params.id
  console.log(req.body)
  db.tour.findAndModify({
    query: { _id: mongojs.ObjectId(id) },
    update: { $set: { tourName: req.body.tourName, tourCity: req.body.tourCity, tourDescription: req.body.tourDescription, tourImage: req.body.tourImage } },
    new: true
  }, function (err, doc) {
    res.json(doc)
  }
  )
})


app.get('/cars', function (req, res) {
  db.cars.find(function (err, docs) {
    console.log(docs)
    res.json(docs)
  })
})

app.post('/cars', urlencodedParser, function (req, res, next) {
  console.log(req.body)

  db.cars.insert(req.body, function (err, docs) {
    console.log('inserted')
    res.json(docs)
  })
})

app.delete('/deleteCar/:id', function (req, res) {
  var id = req.params.id
  console.log(id)
  db.cars.remove({
    _id: mongojs.ObjectId(id)
  }, function (err, doc) {
    res.json(doc)
  })
})

app.get('/cars/:id', urlencodedParser, function (req, res) {
  var id = req.params.id
  console.log(id)
  db.cars.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc)
  })
})

app.put('/cars/:id', function (req, res) {
  var id = req.params.id
  console.log(req.body)
  db.cars.findAndModify({
    query: { _id: mongojs.ObjectId(id) },
    update: { $set: { carName: req.body.carName, carModel: req.body.carModel, carDescription: req.body.carDescription, carImage: req.body.carImage } },
    new: true
  }, function (err, doc) {
    res.json(doc)
  }
  )
})

app.get('/employees', function (req, res) {
  db.employees.find(function (err, docs) {
    console.log(docs)
    res.json(docs)
  })
})

app.post('/employees', urlencodedParser, function (req, res, next) {
  console.log(req.body)

  db.employees.insert(req.body, function (err, docs) {
    console.log('inserted')
    res.json(docs)
  })
})

app.delete('/deleteEmployee/:id', function (req, res) {
  var id = req.params.id
  console.log(id)
  db.employees.remove({
    _id: mongojs.ObjectId(id)
  }, function (err, doc) {
    res.json(doc)
  })
})

app.get('/employees/:id', urlencodedParser, function (req, res) {
  var id = req.params.id
  console.log(id)
  db.employees.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc)
  })
})

app.put('/employees/:id', function (req, res) {
  var id = req.params.id
  console.log(req.body)
  db.employees.findAndModify({
    query: { _id: mongojs.ObjectId(id) },
    update: { $set: { employeeName: req.body.employeeName, employeeAge: req.body.employeeAge, employeePosition: req.body.employeePosition, employeeImage: req.body.employeeImage } },
    new: true
  }, function (err, doc) {
    res.json(doc)
  }
  )
})

app.listen(port, function () {
  console.log('Node app is running on port', port)
})
