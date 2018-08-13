function getTours($scope, $http, toastr, Popeye) {
  var http = function () {
    $http.get('/tours').then(function (response) {
      $scope.myWelcome = response.data
    })
  }

  http()

  $scope.openUserProfile = function (userId) {

    // Open a modal to show the selected user profile
    var modal = Popeye.openModal({
      controller: "myModalCtrl as ctrl",
      resolve: {
        user: function ($http) {
          return $http.get("/tours");
        }
      }
    });

    $scope.showLoading = true;
    modal.resolved.then(function () {
      $scope.showLoading = false;
    });

    modal.closed.then(function () {
      $scope.updateUser();
    });
  };

  $scope.addTour = function () {
    console.log('add tour')
    console.log($scope.tour)
    $http.post('/tours', $scope.tour).then(function (response) {
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
    $http.delete('/deleteTour/' + id).then(function (response) {
      console.log('removed')
      toastr.error("Tour removed")
      http()
    })
  }

  $scope.edit = function (id) {
    console.log('select tour')
    console.log(id)
    $http.get('/tours/' + id).then(function (response) {
      console.log('selected')
      $scope.tour = response.data
    })
  }

  $scope.update = function () {
    console.log('update tour')
    console.log($scope.tour._id)
    $http.put('/tours/' + $scope.tour._id, $scope.tour).then(function (response) {
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
}