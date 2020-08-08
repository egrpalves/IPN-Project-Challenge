(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateBookController', CreateBookController);

    CreateBookController.$inject = ['$scope', 'dataService', '$location', '$log'];

    function CreateBookController($scope, dataService, $location, $log) {
        $scope.newBook = {};
        $scope.currentYear = new Date();
        $scope.currentYear = $scope.currentYear.getFullYear();

        $scope.addBook = function (createBookForm) {
            if (createBookForm.$valid) {
                dataService.addBook($scope.newBook)
                    .then(function (result) {
                        toastr.success('Book added successfully');
                        $location.path('#/books');
                    })
                    .catch(function (response) {
                        toastr.error(response.data.Message);
                    })
            } else {
                alert('Please correct the validation errors');
            }
            
        };

        $scope.cancel = function () {
            $location.path('#/books');
        }
    }
})();
