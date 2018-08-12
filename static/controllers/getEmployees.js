function getEmployees($scope, $http) {
    var http = function () {
        $http.get('/employees').then(function (response) {
            $scope.myWelcome = response.data
        })
    }

    http()

    $scope.addEmployee = function () {
        console.log('add employee')
        console.log($scope.employee)
        $http.post('/employees', $scope.employee).then(function (response) {
            console.log(response)
            $scope.employee.employeeName = ''
            $scope.employee.employeeAge = ''
            $scope.employee.employeePosition = ''
            $scope.employee.employeeImage = ''
            http()
        })
    }

    $scope.deleteEmployee = function (id) {
        console.log('delete employee')
        console.log(id)
        $http.delete('/deleteEmployee/' + id).then(function (response) {
            console.log('removed')
            http()
        })
    }

    $scope.edit = function (id) {
        console.log('select employee')
        console.log(id)
        $http.get('/employees/' + id).then(function (response) {
            console.log('selected')
            $scope.employee = response.data
        })
    }

    $scope.update = function () {
        console.log('update employee')
        console.log($scope.employee._id)
        $http.put('/employees/' + $scope.employee._id, $scope.employee).then(function (response) {
            console.log('update')
            $scope.employee.employeeName = ''
            $scope.employee.employeeAge = ''
            $scope.employee.employeePosition = ''
            $scope.employee.employeeImage = ''
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