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

  var users = function () {
    $http.get('/registeredUser').then(function (response) {
      $scope.registeredUser = response.data - 1
    })
  }

  var tours = function () {
    $http.get('/toursNumber').then(function (response) {
      $scope.toursNumber = response.data
    })
  }


  if(localStorage.getItem('type') == "admin"){
    console.log('juhu')
      http()
      users()
      tours()
  } else if(localStorage.getItem('type') == 'user'){
    httpUser();
  } else {
    toastr.error("You have to be logged in")
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
      tours()
      http()
    })

  }


  $scope.deleteTour = function (id) {
    console.log('delete tour')
    console.log(id)
    $http.delete('/admin/deleteTour/' + id, config).then(function (response) {
      console.log('removed')
      toastr.error("Tour removed")
      tours()
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

  /*TODO: feedback app i tour, tour request nece da cita iz fileda
  vidjet da se uradi nesto na fazon get / update - delete...
  feedback tour i request peko ID --> ovo gore
  */
  $scope.sentFeedback = function () {
    console.log('tour feedback sent')
    console.log($scope.feedack)
    $http.post('/tourFeedback', $scope.feedack).then(function (response) {
      console.log(response)
      //$scope.feedack.tourFeedback = "";
      toastr.success("Thanks for your feedback!!!")
    })
  }

  $scope.requestTour = function () {
    console.log('tour requested')
    console.log($scope.request)
    $http.post('/tourRequest', $scope.request).then(function (response) {
      console.log(response)
      //$scope.req.email = "";
      toastr.success("Tour requested successfully!!!")
    })
  }


  $scope.sendAppFeed = function () {
    console.log('Feedback sent');
    console.log($scope.abu);
    $http.post('/sendingAppFeed', $scope.abu).then(function (response) {
      console.log(response)
      $scope.test = "";
      toastr.success("Thanks!!!")
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
