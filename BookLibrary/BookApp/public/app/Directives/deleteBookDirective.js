(function () {
    angular
        .module('app')
        .directive('deleteBook', deleteBook);

    function deleteBook() {
        return {
            restrict: 'E',
            templateUrl: '/app/Templates/deleteConfirmationTemplate.html',
            scope: {
                notifyParent: '&method'
            },
            controller: function ($scope) {
                $scope.deleting = false;
                $scope.startDelete = function () {
                    $scope.deleting = true;
                };
                $scope.cancelDelete = function () {
                    $scope.deleting = false;
                };
                $scope.confirmDelete = function () {
                    $scope.notifyParent();
                }
            }
        }
    }


})();