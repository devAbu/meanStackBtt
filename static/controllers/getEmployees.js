function getEmployees($scope, $http, toastr, Popeye) {
  var config = {headers:  {
   'Authorization': 'Basic TmljayBDZXJtaW5hcmE6cGFzc3dvcmQ=',
   'Accept': 'application/json;odata=verbose',
   "JWT" : localStorage.getItem('user')
   }
};

  console.log(localStorage.getItem('user'))
  console.log(localStorage.getItem('type'))

  var http = function () {
    $http.get('/admin/employees', config).then(function (response) {
      $scope.myWelcome = response.data
    })
  }

  var httpUser = function () {
    $http.get('/check/employees', config).then(function (response) {
      $scope.myWelcome = response.data
    })
  }

  var employeesNumber = function () {
    $http.get('/employeesNumber').then(function (response) {
      $scope.employeesNumber = response.data
    })
  }

  if(localStorage.getItem('type') == "admin"){
    console.log('juhu')
      http()
      employeesNumber()
  }  else {
    toastr.error("You can not see info about our employees!!!")
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
    $scope.employee.employeeName = ''
    $scope.employee.employeeAge = ''
    $scope.employee.employeePosition = ''
    $scope.employee.employeeImage = ''
  }

  $scope.addEmployee = function () {
    console.log('add employees')
    console.log($scope.employee)
    $http.post('/admin/employees', $scope.employee,config).then(function (response) {
      console.log(response)
      $scope.employee.employeeName = ''
      $scope.employee.employeeAge = ''
      $scope.employee.employeePosition = ''
      $scope.employee.employeeImage = ''
        toastr.success("employees added successfully")
  employeesNumber()
      http()
    })

  }

  $scope.deleteEmployee = function (id) {
    console.log('delete employees')
    console.log(id)
    $http.delete('/admin/deleteEmployees/' + id, config).then(function (response) {
      console.log('removed')
      toastr.error("employees removed")
        employeesNumber()
      http()
    })
  }

  $scope.edit = function (id) {
    console.log('select employees')
    console.log(id)
    $http.get('/admin/employees/' + id, config).then(function (response) {
      console.log('selected')
      $scope.employee = response.data
    })
  }

  $scope.update = function () {
    console.log('update employees')
    console.log($scope.employee._id)
    $http.put('/admin/employees/' + $scope.employee._id, $scope.employee, config).then(function (response) {
      console.log('update')
      $scope.employee.employeeName = ''
      $scope.employee.employeeAge = ''
      $scope.employee.employeePosition = ''
      $scope.employee.employeeImage = ''
      toastr.success("employees updated successfully")
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
