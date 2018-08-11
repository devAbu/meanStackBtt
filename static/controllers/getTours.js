function getTours($scope, $http) {

    var http = function () {
        $http.get("/tours").then(function (response) {
            $scope.myWelcome = response.data;
        });
    }

    http();

    $scope.addTour = function () {
        console.log($scope.tour);
        $http.post('/tours', $scope.tour).then(function (response) {
            console.log(response);
            $scope.tour = "";
            http();
        });
    };

    $scope.deleteTour = function (id) {
        console.log(id);
        $http.delete('/deleteTour/' + id).then(function (response) {
            console.log('removed')
            http();
        });
    };
};