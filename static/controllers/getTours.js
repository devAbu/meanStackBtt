function getTours($scope, $http, toastr, Popeye) {
  var config = {headers:  {
   'Authorization': 'Basic TmljayBDZXJtaW5hcmE6cGFzc3dvcmQ=',
   'Accept': 'application/json;odata=verbose',
   "JWT" : localStorage.getItem('user')
   }
};

  console.log(localStorage.getItem('user'))
  console.log(localStorage.getItem('type'))

  var http = function () {
    $http.get('/admin/tours', config).then(function (response) {
      $scope.myWelcome = response.data
    })
  }

  var httpUser = function () {
    $http.get('/check/tours', config).then(function (response) {
      $scope.myWelcome = response.data
    })
  }

  if(localStorage.getItem('type') == "admin"){
    console.log('juhu')
      http()
  } else if(localStorage.getItem('type') == 'user'){
    httpUser();
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

  $scope.addTour = function () {
    console.log('add tour')
    console.log($scope.tour)
    $http.post('/admin/tours', $scope.tour,config).then(function (response) {
      console.log(response)
      $scope.tour.tourName = ''
      $scope.tour.tourCity = ''
      $scope.tour.tourDescription = ''
      $scope.tour.tourImage = ''
        toastr.success("Tour added successfully")

      http()
    })

  }

  $scope.deleteTour = function (id) {
    console.log('delete tour')
    console.log(id)
    $http.delete('/admin/deleteTour/' + id, config).then(function (response) {
      console.log('removed')
      toastr.error("Tour removed")
      http()
    })
  }

  $scope.edit = function (id) {
    console.log('select tour')
    console.log(id)
    $http.get('/admin/tours/' + id, config).then(function (response) {
      console.log('selected')
      $scope.tour = response.data
    })
  }

  $scope.update = function () {
    console.log('update tour')
    console.log($scope.tour._id)
    $http.put('/admin/tours/' + $scope.tour._id, $scope.tour, config).then(function (response) {
      console.log('update')
      $scope.tour.tourName = ''
      $scope.tour.tourCity = ''
      $scope.tour.tourDescription = ''
      $scope.tour.tourImage = ''
      toastr.success("Tour updated successfully")
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

  $scope.collapse3 = function () {
    $scope.visible2 = false;
    $scope.visible2 = $scope.visible2 = true;
  }
  $scope.collapse4 = function () {
    $scope.visible2 = true;
    $scope.visible2 = $scope.visible2 = false;
  }
}
