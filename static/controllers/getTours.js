function getTours($scope, $http) {
    http();

    /*  var refresh = function () {
         $http.get('/tours').then(function (response) {
             console.log("I got the data I requested");
             $scope.myWelcome = response;
             $scope.x = "";
         });
     }; */

    function http() {
        $http.get("/tours").then(function (response) {
            $scope.myWelcome = response.data;
        });
    }

    $scope.deleteTour = function (id) {
        console.log(id);
        $http.delete('/deleteTour/' + id).then(function (response) {
            console.log('removed')
            //refresh();
        });
    };
};