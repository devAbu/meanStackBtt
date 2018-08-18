function login($scope, $http, toastr, $location){
    console.log("Hello from Site Controller");

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

    var http = function () {
      $http.get('/admin/tours', config).then(function (response) {
        $scope.myWelcome = response.data
      })
    }

    $scope.login = function(credentials){
        $http.post('/login', credentials).then(function(response){
            if(typeof response.data.token != 'undefined'){
                localStorage.setItem('user',response.data.token)
                localStorage.setItem('type', response.data.type)
                toastr.success('You are successfully logged in!', 'Login Success!');
                if(localStorage.getItem('type') == "user" ){
                    $location.url('/userPage');
                } else if(localStorage.getItem('type') == "admin"){
                    $location.url('/adminPage');
                    http()
                }

            }
            else if(response.data.user == false){
                toastr.error('Login Error');
            }
        }),function(response){
            console.log(error);
        }
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
