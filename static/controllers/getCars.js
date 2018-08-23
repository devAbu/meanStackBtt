function getCars($scope, $http, toastr, Popeye) {
  var config = {headers:  {
   'Authorization': 'Basic TmljayBDZXJtaW5hcmE6cGFzc3dvcmQ=',
   'Accept': 'application/json;odata=verbose',
   "JWT" : localStorage.getItem('user')
   }
};

  console.log(localStorage.getItem('user'))
  console.log(localStorage.getItem('type'))

  var http = function () {
    $http.get('/admin/cars', config).then(function (response) {
      $scope.myWelcome = response.data
    })
  }

  var carsNumber = function () {
    $http.get('/carsNumber').then(function (response) {
      $scope.carsNumber = response.data
    })
  }


  if(localStorage.getItem('type') == "admin"){
    console.log('juhu')
      http()
      carsNumber()
  } else {
    toastr.error("You can not see our cars!!!")
  }

  $scope.check_login = function(){
      if(localStorage.getItem('user')){
          return true;
      }
      return false;
  }

  $scope.check_admin = function(){
      if(localStorage.getItem('type') == "admin"){
          return true;
      }
      return false;
  }

  $scope.logout = function(){
        localStorage.clear();
        toastr.info("Successfully logged out!", "Logged Out!");
    }

  $scope.open = function () {
    $scope.visible = false;
    $scope.visible = $scope.visible = true;
  }

  $scope.close = function () {
    $scope.visible = true;
    $scope.visible = $scope.visible = false;
  }

  $scope.addCar = function () {
    console.log('add cars')
    console.log($scope.car)
    $http.post('/admin/cars', $scope.car,config).then(function (response) {
      console.log(response)
      $scope.car.carName = ''
      $scope.car.carModel = ''
      $scope.car.carDescription = ''
      $scope.car.carImage = ''
        toastr.success("car added successfully")
carsNumber()
      http()
    })

  }

  $scope.deleteCar = function (id) {
    console.log('delete car')
    console.log(id)
    $http.delete('/admin/deleteCars/' + id, config).then(function (response) {
      console.log('removed')
      toastr.error("Car removed")
      carsNumber()
      http()
    })
  }

  $scope.edit = function (id) {
    console.log('select car')
    console.log(id)
    $http.get('/admin/cars/' + id, config).then(function (response) {
      console.log('selected')
      $scope.car = response.data
    })
  }

  $scope.update = function () {
    console.log('update car')
    console.log($scope.car._id)
    $http.put('/admin/cars/' + $scope.car._id, $scope.car, config).then(function (response) {
      console.log('update')
      $scope.car.carName = ''
      $scope.car.carModel = ''
      $scope.car.carDescription = ''
      $scope.car.carImage = ''
      toastr.success("car updated successfully")
      http()
    })
  }

  $scope.collapse = function () {
    $scope.visible = false;
    $scope.visible = $scope.visible = true;
  }
  $scope.collapse2 = function () {
    $scope.visible = true;
    $scope.visible = $scope.visible = false;
  }
}
