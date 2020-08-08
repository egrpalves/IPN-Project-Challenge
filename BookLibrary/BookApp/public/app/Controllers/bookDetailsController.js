(function () {
    'use strict';

    angular
        .module('app')
        .controller('BookDetailsController', BookDetailsController);

    BookDetailsController.$inject = ['$scope', 'dataService', '$routeParams', '$log', '$location'];

    function BookDetailsController($scope, dataService, $routeParams, $log, $location) {
        $scope.book = {};

        dataService.getBookById($routeParams.Id).then(function (result) {
            $scope.book = result;
        });
        

        $scope.deleteBook = function () {
            dataService.deleteBook($routeParams.Id)
                .then(function (result) {
                    $log.info(result);
                    toastr.success('Book Deleted Successfully');
                    $location.path('/');
                })
                .catch(function (errorMessage) {
                    $log.error(errorMessage);
                    toastr.error(errorMessage.data.Message);
                })
        }
    }
})();
