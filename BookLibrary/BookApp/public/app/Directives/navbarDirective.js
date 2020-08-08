(function () {
    angular.module('app')
        .directive('myNavbar', function () {
            return {
                restrict: 'E',
                templateUrl: '/app/templates/navbarTemplate.html',
                controller: 'AccountController'
            }
        });
})();