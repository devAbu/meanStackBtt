const express = require('express');
const bodyparser = require("body-parser");
const app = express();
const jwt_secret = 'WU5CjF8fHxG40S2t7oyk';
const jwt_admin = 'SJwt25Wq62SFfjiw92sR';
var port = process.env.PORT || 3000
// var bcrypt = require('bcrypt');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
//var bcrypt2 = require('bcrypt');
var jwt = require('jsonwebtoken');
var mongojs = require('mongojs');
// var MongoId = require('mongodb').ObjectID;
//var db = mongojs('localhost:27017/btt', ['tour','users', 'tourFeedback', 'requestedTour', 'cars', 'employees', 'appFeedback'])
//var db = mongojs(process.env.MONGOLAB_URI || 'localhost:27017/btt2', ['tour','users'])
var db = mongojs(process.env.MONGOLAB_URI || 'mongodb://devAbu:aburefko159753@ds125272.mlab.com:25272/btt')

app.use(express.static(__dirname + '/static'));
app.use(express.json()); // to support JSON-encoded bodies
app.use(bodyparser.json());
var urlencodedParser = bodyparser.urlencoded({
  extended: false
})

app.use('/check/', function(request, response, next) {
  jwt.verify(request.get('JWT'), jwt_secret, function(error, decoded) {
    if (error) {
      response.status(401).send('Unauthorized access');
    } else {
      db.users.findOne({
        '_id': new mongojs.ObjectId(decoded._id)
      }, function(error, user) {
        if (error) {
          throw error;
        } else {
          if (user) {
            next();
          } else {
            response.status(401).send('Credentials are wrong.');
          }
        }
      });
    }
  });
})

app.use('/admin/', function(request, response, next) {
  jwt.verify(request.get('JWT'), jwt_admin, function(error, decoded) {
    if (error) {
      response.status(401).send('Unauthorized access');
    } else {
      db.users.findOne({
        '_id': new mongojs.ObjectId(decoded._id)
      }, function(error, user) {
        if (error) {
          throw error;
        } else {
          if (user) {
            next();
          } else {
            response.status(401).send('Credentials are wrong.');
          }
        }
      });
    }
  });
})

app.post('/login', function(req, res) {
  var user = req.body;
  db.users.findOne({
    'email': user.email,
  }, function(error, users) {
    if (error) {
      throw error;
    }
    if (users) {
      bcrypt.compare(user.password, users.password, function(err, resp) {
        if (resp === true) {
          if (users.type == "admin") {
            users.password = null;
            var token = jwt.sign(users, jwt_admin, {
              expiresIn: 60 * 60 * 24
            });
            res.send({
              success: true,
              message: 'Admin Authenticated',
              token: token,
              type: 'admin'
            })
            console.log("Admin authentication passed.");
          } else if (users.type == "user") {
            users.password = null;
            var token = jwt.sign(users, jwt_secret, {
              expiresIn: 60 * 60 * 24
            });
            res.send({
              success: true,
              message: 'Authenticated',
              token: token,
              type: "user"
            })
            console.log("Authentication passed.");
          }
        } else {
          res.send({
            user: false
          })
        }
      })
    }
  });
});

app.post('/register', function(req, res, next) {
  req.body.type = "user";
  req.body._id = null;
  var user = req.body;
  var find = req.body.email;
  console.log(find);
  bcrypt.hash(user.password, salt, null, function(err, hash) {
    if (err) {
      throw err
    }
    user.password = hash;
    db.users.find({
      email: find
    }).toArray(function(err, result) {
      if (err) throw err;

      console.log(result);

      if (result.length > 0) {
        res.sendStatus(204);
      } else {
        db.users.insert(user, function(err, data) {
          if (err) return console.log(err);
          res.setHeader('Content-Type', 'application/json');
          res.send(user);
        })
      }
    })
  })
});



app.get('/admin/tours', function(req, res) {
  db.tour.find(function(err, tours) {
    //console.log(tours)
    db.tourFeedback.aggregate([
      {
     $group:
       {
         _id: "$tour_id",
         totalRate: { $sum: "$rate" } ,
         avgRate: { $avg: "$rate" }
       }
   }
    ], function(err, tour_rates){
      for(var i =0 ; i < tours.length; i++){
        for(var j = 0; j < tour_rates.length; j++){
          if (tours[i]._id == tour_rates[j]._id){
            tours[i].rate = tour_rates[j].avgRate;
          }
        }
      }
      console.log(tours)
      console.log(err)
console.log( tour_rates)
       //for()
       res.json(tours)
       //res.json(tour_rates)
    })

  })
})

app.get('/check/tours', function(req, res) {
  db.tour.find(function(err, docs) {
    console.log(docs)
    res.json(docs)
  })
})

app.post('/admin/tours', urlencodedParser, function(req, res, next) {
  console.log(req.body)

  db.tour.insert(req.body, function(err, docs) {
    console.log('inserted')
    res.json(docs)
  })
})

app.delete('/admin/deleteTour/:id', function(req, res) {
  var id = req.params.id
  console.log(id)
  db.tour.remove({
    _id: mongojs.ObjectId(id)
  }, function(err, doc) {
    console.log('removed')
    res.json(doc)
  })
})

app.get('/admin/tours/:id', urlencodedParser, function(req, res) {
  var id = req.params.id
  console.log(id)
  db.tour.findOne({
    _id: mongojs.ObjectId(id)
  }, function(err, doc) {
    console.log('selected')
    res.json(doc)
  })
})

app.put('/admin/tours/:id', function(req, res) {
  var id = req.params.id
  console.log(req.body)
  db.tour.findAndModify({
    query: {
      _id: mongojs.ObjectId(id)
    },
    update: {
      $set: {
        tourName: req.body.tourName,
        tourCity: req.body.tourCity,
        tourDescription: req.body.tourDescription,
        tourImage: req.body.tourImage
      }
    },
    new: true
  }, function(err, doc) {
    console.log('updated')
    res.json(doc)
  })
})


app.get('/admin/cars', function(req, res) {
  db.cars.find(function(err, docs) {
    console.log(docs)
    res.json(docs)
  })
})

app.post('/admin/cars', urlencodedParser, function(req, res, next) {
  console.log(req.body)

  db.cars.insert(req.body, function(err, docs) {
    console.log('inserted')
    res.json(docs)
  })
})

app.delete('/admin/deleteCars/:id', function(req, res) {
  var id = req.params.id
  console.log(id)
  db.cars.remove({
    _id: mongojs.ObjectId(id)
  }, function(err, doc) {
    console.log('removed')
    res.json(doc)
  })
})

app.get('/admin/cars/:id', urlencodedParser, function(req, res) {
  var id = req.params.id
  console.log(id)
  db.cars.findOne({
    _id: mongojs.ObjectId(id)
  }, function(err, doc) {
    console.log('selected')
    res.json(doc)
  })
})

app.put('/admin/cars/:id', function(req, res) {
  var id = req.params.id
  console.log(req.body)
  db.cars.findAndModify({
    query: {
      _id: mongojs.ObjectId(id)
    },
    update: {
      $set: {
        carName: req.body.carName,
        carModel: req.body.carModel,
        carDescription: req.body.carDescription,
        carImage: req.body.carImage
      }
    },
    new: true
  }, function(err, doc) {
    console.log('updated')
    res.json(doc)
  })
})

app.get('/admin/employees', function(req, res) {
  db.employees.find(function(err, docs) {
    console.log(docs)
    res.json(docs)
  })
})

app.post('/admin/employees', urlencodedParser, function(req, res, next) {
  console.log(req.body)

  db.employees.insert(req.body, function(err, docs) {
    console.log('inserted')
    res.json(docs)
  })
})

app.delete('/admin/deleteEmployees/:id', function(req, res) {
  var id = req.params.id
  console.log(id)
  db.employees.remove({
    _id: mongojs.ObjectId(id)
  }, function(err, doc) {
    console.log('removed')
    res.json(doc)
  })
})

app.get('/admin/employees/:id', urlencodedParser, function(req, res) {
  var id = req.params.id
  console.log(id)
  db.employees.findOne({
    _id: mongojs.ObjectId(id)
  }, function(err, doc) {
    console.log('selected')
    res.json(doc)
  })
})

app.put('/admin/employees/:id', function(req, res) {
  var id = req.params.id
  console.log(req.body)
  db.employees.findAndModify({
    query: {
      _id: mongojs.ObjectId(id)
    },
    update: {
      $set: {
        employeeName: req.body.employeeName,
        employeeAge: req.body.employeeAge,
        employeePosition: req.body.employeePosition,
        employeeImage: req.body.employeeImage
      }
    },
    new: true
  }, function(err, doc) {
    console.log('updated')
    res.json(doc)
  })
})

app.post('/tourFeedback/:id', urlencodedParser, function(req, res, next) {
  console.log(req.body)
  var id = req.params.id
  console.log("server " + id)
  console.log(req.body.rate)
  req.body.tour_id = id
  req.body.rate = Number(req.body.rate)
  db.tourFeedback.insert(req.body, function(err, docs) {
    console.log('inserted')
    res.json(docs)
  })

  db.tour.aggregate( [
   {
     $addFields: {
       "rate": req.body.rate ,
      }
   },
] )

})

app.post('/tourRequest/:id', urlencodedParser, function(req, res, next) {
  console.log(req.body)
  var id = req.params.id
  console.log(id)
  req.body.tour_id = id
  db.requestedTour.insert(req.body, function(err, docs) {
    console.log('inserted')
    res.json(docs)
  })
})

app.post('/sendingAppFeed', urlencodedParser, function(req, res, next) {
  console.log(req.body);
  db.appFeedback.insert(req.body, function(err, docs) {
    console.log('inserted')
    res.json(docs)
  })
})

app.get('/registeredUser', urlencodedParser, function(req, res, next) {
  db.users.count(function(err, count) {
    console.log(count)
    res.json(count)
  })
})

app.get('/toursNumber', urlencodedParser, function(req, res, next) {
  db.tour.count(function(err, count) {
    console.log(count)
    res.json(count)
  })
})

app.get('/tourFeedbackNumber', urlencodedParser, function(req, res, next) {
  db.tourFeedback.count(function(err, count) {
    console.log(count)
    res.json(count)
  })
})

app.get('/appFeedbackNum', urlencodedParser, function(req, res, next) {
  db.appFeedback.count(function(err, count) {
    console.log(count)
    res.json(count)
  })
})

app.get('/tourRequestNum', urlencodedParser, function(req, res, next) {
  db.requestedTour.count(function(err, count) {
    console.log(count)
    res.json(count)
  })
})


app.get('/carsNumber', urlencodedParser, function(req, res, next) {
  db.cars.count(function(err, count) {
    console.log(count)
    res.json(count)
  })
})

app.get('/employeesNumber', urlencodedParser, function(req, res, next) {
  db.employees.count(function(err, count) {
    console.log(count)
    res.json(count)
  })
})

app.get('/admin/tourFeedback', function(req, res) {
  // db.tourFeedback.find(function(err, docs) {
  //   console.log(docs)
  //   res.json(docs)
  // })

  db.tourFeedback.aggregate([{
    $lookup: {
      from: "tour",
      localField: "tour_id",
      foreignField: "_id",
      as: "combinedResult"
    }
  }]).toArray(function(err,docs){
    if(err) throw err;
    console.log(docs)
    res.json(docs)
  })
})

app.get('/admin/appFeedback', function(req, res) {
  db.appFeedback.find(function(err, docs) {
    console.log(docs)
    res.json(docs)
  })
})

app.get('/admin/tourRequest', function(req, res) {
  // db.requestedTour.find(function (err, docs) {
  //   console.log(docs)
  //   res.json(docs)
  // })

  db.requestedTour.aggregate([{
    $lookup: {
      from: "tour",
      localField: "tour_id",
      foreignField: "_id",
      as: "combinedResult"
    }
  }]).toArray(function(err,docs){
    if(err) throw err;
    console.log(docs)
    res.json(docs)
  })
})

//TODO: Spojit tour feedback i request sa tabelom tour i izbacit ime te ture preko ID

app.listen(port, function() {
  console.log('Node app is running on port', port)
})
