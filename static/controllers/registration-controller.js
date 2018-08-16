function RegistrationController($scope, $http, toastr, $location){
    console.log("Hello from Registration Controller");


    $scope.add_user = function(){
        $http.post('/register', $scope.user).then(function(data){
          console.log(data.status);
          if(data.status == 204){
            toastr.error("Email already exists");
            $scope.user.name = "";
            $scope.user.email = "";
            $scope.user.password = "";
          } else{
          $scope.user = null;
          toastr.success("You are successfully registered! Please Login!", "Registration Successfull!");
          $location.url('/');
          //$scope.users_list.push(data);
          }
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
