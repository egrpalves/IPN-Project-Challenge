(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditBookController', EditBookController);

    EditBookController.$inject = ['$scope', 'dataService', '$location', '$log', '$routeParams'];

    function EditBookController($scope, dataService, $location, $log, $routeParams) {
        $scope.book = {};

        dataService.getBookById($routeParams.Id).then(function (result) {
            $scope.book = result;
        });

        $scope.editBook = function () {
            dataService.editBook($scope.book, $routeParams.Id)
                .then(function (result) {
                    $log.info(result);
                    toastr.success('Book edited successfully');
                    $location.path('/');
                })
                .catch(function (errorMessage) {
                    $log.error(errorMessage)
                    toastr.error(errorMessage.data.Message);
                })
        };

        $scope.cancel = function () {
            $location.path('/');
        }
    }
})();
