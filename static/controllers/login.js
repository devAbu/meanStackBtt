function login($scope, $http){
    $scope.pass = "password"
    $scope.eye = function(){
        if ($scope.pass == "password"){
            $scope.pass = "text"
        } else {
            $scope.pass = "password"
        }
    }
}