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

    $scope.login = function(credentials){
        $http.post('/login', credentials).then(function(response){
            if(typeof response.data.token != 'undefined'){
                localStorage.setItem('user',response.data.token)
                localStorage.setItem('type', response.data.type)
                toastr.success('You are successfully logged in!', 'Login Success!');
                $location.url('/');
            }
            else if(response.data.user == false){
                toastr.error('Login Error');
            }
        }),function(response){
            console.log(error);
        }
    }
}