(function () {
    'use strict';

    angular
        .module('app')
        .controller('BookController', ['$scope', 'dataService', '$log', BookController]);

    function BookController($scope, dataService, $log) {
        $scope.books = [];
        $scope.order = { descending: false, column: 'Title' };
        $scope.changeOrder = function (column) {
            var order = $scope.order;

            if (order.column == column) {
                order.descending = !order.descending;
            } else {
                order.column = column;
                order.descending = false;
            }
        };

        dataService.getAllBooks().then(function (result) {
            $scope.books = result;
        });
    }
})();
