(function () {
    'use strict';

    angular.module('app', ['ngRoute', 'ngCookies'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/app/Templates/homeTemplate.html'
                })
                .when('/books', {
                    controller: 'BookController',
                    templateUrl: '/app/Templates/booksTemplate.html'
                })
                .when('/book/:Id', {
                    controller: 'BookDetailsController',
                    templateUrl: '/app/Templates/bookDetailsTemplate.html',
                })
                .when('/create', {
                    controller: 'CreateBookController',
                    templateUrl: '/app/Templates/createBookTemplate.html'
                })
                .when('/edit/:Id', {
                    controller: 'EditBookController',
                    templateUrl: '/app/Templates/editBookTemplate.html'
                })
                .when('/register', {
                    controller: 'AccountController',
                    templateUrl: '/app/Templates/registerAccountTemplate.html'
                })
                .otherwise({ redirectTo: '/' });
        }]);

})();