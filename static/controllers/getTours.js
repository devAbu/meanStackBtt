function getTours($scope, $http) {
    http();

    function http() {
        $http.get("/tours").then(function (response) {
            $scope.myWelcome = response.data;
        });
    }
};