function RegistrationController($scope, $http, toastr, $location){
    console.log("Hello from Registration Controller");

    $scope.add_user = function(){
        $http.post('/register', $scope.user).then(function(data){
          $scope.user = null;
          toastr.success("You are successfully registered! Please Login!", "Registration Successfull!");
          $location.url('/');
          $scope.users_list.push(data);
        });
      }

      $scope.text = "password";
      $scope.change = function () {
       if ($scope.text == "password") {
           $scope.text = "text";
       } else {
           $scope.text = "password";
       }
     }
}
