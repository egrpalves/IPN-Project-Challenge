(function () {
    'use strict';

    angular.module('app')
        .controller('AccountController', ['$scope', 'userAccountService', 'currentUser', '$location', '$log', '$cookies', AccountController]);

    function AccountController($scope, userAccountService, currentUser, $location, $log, $cookies) {
        var sessionUsername = $cookies.get('sessionUsername');
        var sessionToken = $cookies.get('sessionToken');

        if (sessionUsername != null && sessionToken != null) {
            currentUser.setProfile(sessionUsername, sessionToken);
            $scope.isLoggedIn = currentUser.getProfile().isLoggedIn;
        } else {
            $scope.isLoggedIn = false;
        }

        $scope.passwordValid = true;
        $scope.confirmPasswordValid = true;
        $scope.message = "";
        $scope.userData = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            roleName: ''
        };

        $scope.registerUser = function () {

            if ($scope.userData.password.length < 6) {
                $scope.passwordValid = false;
            } else if ($scope.userData.confirmPassword != $scope.userData.password) {
                $scope.confirmPasswordValid = false;
            } else {
                $scope.passwordValid = true;
                $scope.confirmPasswordValid = true;

                userAccountService.registerUser($scope.userData)
                    .then(function (data) {
                        $location.path("/");
                    })
                    .catch(function (response) {
                        $scope.isLoggedIn = false;
                        $scope.message = response.data.modelState.error[1];
                    });
            }
        }

        $scope.login = function () {
            $scope.userData.grant_type = "password";
            $scope.userData.username = $scope.userData.email;

            userAccountService.loginUser($scope.userData)
                .then(function (data) {
                    $scope.isLoggedIn = true;
                    $scope.message = "";
                    $scope.password = "";
                    currentUser.setProfile($scope.userData.username, data.access_token);
                    $scope.userData.email = "";
                    $scope.userData.password = "";

                    var expirationDate = new Date();
                    expirationDate.setHours(expirationDate.getHours() + 1);

                    $cookies.put('sessionUsername', currentUser.getProfile().username, { 'expires': expirationDate });
                    $cookies.put('sessionToken', currentUser.getProfile().token, { 'expires': expirationDate });

                    toastr.success($scope.userData.email + ' logged in!');
                })
                .catch(function (response) {
                    $scope.password = "";
                    $scope.isLoggedIn = false;
                    $scope.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage) {
                        $scope.message += response.data.exceptionMessage;
                        toastr.error($scope.message);
                    }
                    if (response.data.error) {
                        $scope.message += response.data.error;
                        toastr.error($scope.message);
                    }
                });
        }

        $scope.logout = function () {
            $cookies.remove('sessionToken');
            $cookies.remove('sessionUsername');
            $scope.isLoggedIn = false;
            toastr.success("Logged Out");
            $location.path("/");
        }
    }


})();