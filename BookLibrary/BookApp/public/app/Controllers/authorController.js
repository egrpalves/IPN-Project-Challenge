(function () {
    'use strict';

    angular
        .module('app')
        .controller('authorController', authorController);

    authorController.$inject = ['$scope'];

    function authorController($scope) {
        $scope.authors = [];

        activate();

        function activate() {
            dataService.getAuthors().then(function (result) {
                $scope.authors = result;
            });
        }
    }
})();
