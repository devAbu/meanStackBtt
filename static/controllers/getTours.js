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

  var appFeed = function () {
    $http.get('/admin/appFeedback', config).then(function (response) {
      $scope.appFeed = response.data
    })
  }

  var tourFeed = function () {
    $http.get('/admin/tourFeedback', config).then(function (response) {
      $scope.tourFeed = response.data
    })
  }

  var tourRequest = function () {
    $http.get('/admin/tourRequest', config).then(function (response) {
      $scope.tourRequest = response.data
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

  var tourFeedbackNum = function () {
    $http.get('/tourFeedbackNumber').then(function (response) {
      $scope.tourFeedbackNumber = response.data
    })
  }

  var appFeedbackNum = function () {
    $http.get('/appFeedbackNum').then(function (response) {
      $scope.appFeedbackNum = response.data
    })
  }

  var tourRequestNum = function () {
    $http.get('/tourRequestNum').then(function (response) {
      $scope.tourRequestNum = response.data
    })
  }


  if(localStorage.getItem('type') == "admin"){
    console.log('juhu')
      http()
      users()
      tours()
      tourFeedbackNum()
      tourFeed()
      appFeedbackNum()
      appFeed()
      tourRequestNum()
      tourRequest()
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

  $scope.sentFeedback = function (id) {
    console.log('tour feedback sent')
    console.log($scope.feedTour)
    console.log("request "+ id)
    $http.post('/tourFeedback/'+id, $scope.feedTour).then(function (response) {
      console.log(response)
      $scope.feedTour.feedTour = "";
      toastr.success("Thanks for your feedback!!!")
    })
  }

  $scope.requestTour = function (id) {
    console.log('tour requested')
    console.log($scope.request)
    console.log("request "+ id)
    $http.post('/tourRequest/'+id, $scope.request).then(function (response) {
      console.log(response)
      $scope.request.email = "";
      toastr.success("Tour requested successfully!!!")
    })
  }


  $scope.sendAppFeed = function () {
    console.log('Feedback sent');
    console.log($scope.feed);
    $http.post('/sendingAppFeed', $scope.feed).then(function (response) {
      console.log(response)
      $scope.feed.text = "";
      toastr.success("Thanks!!!")
    })
  }

  $scope.collapse = function (id) {
    console.log("ctrl "+ id)
    var id = id
    $scope.visible = false;
    $scope.visible = $scope.visible = true;
    $scope.test = id
  }

  $scope.collapse2 = function () {
    $scope.visible = true;
    $scope.visible = $scope.visible = false;
  }

  $scope.collapse3 = function (id) {
    console.log("ctrl " + id)
    var id = id
    $scope.visible2 = false;
    $scope.visible2 = $scope.visible2 = true;
    $scope.test2 = id
  }
  $scope.collapse4 = function () {
    $scope.visible2 = true;
    $scope.visible2 = $scope.visible2 = false;
  }

}
