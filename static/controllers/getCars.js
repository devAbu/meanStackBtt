function getCars($scope, $http) {
    var http = function () {
        $http.get('/cars').then(function (response) {
            $scope.myWelcome = response.data
        })
    }

    http()

    $scope.addCar = function () {
        console.log('add car')
        console.log($scope.car)
        $http.post('/cars', $scope.car).then(function (response) {
            console.log(response)
            $scope.car.carName = ''
            $scope.car.carModel = ''
            $scope.car.carDescription = ''
            $scope.car.carImage = ''
            http()
        })
    }

    $scope.deleteCar = function (id) {
        console.log('delete car')
        console.log(id)
        $http.delete('/deleteCar/' + id).then(function (response) {
            console.log('removed')
            http()
        })
    }

    $scope.edit = function (id) {
        console.log('select car')
        console.log(id)
        $http.get('/cars/' + id).then(function (response) {
            console.log('selected')
            $scope.car = response.data
        })
    }

    $scope.update = function () {
        console.log('update car')
        console.log($scope.car._id)
        $http.put('/cars/' + $scope.car._id, $scope.car).then(function (response) {
            console.log('update')
            $scope.car.carName = ''
            $scope.car.carModel = ''
            $scope.car.carDescription = ''
            $scope.car.carImage = ''
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