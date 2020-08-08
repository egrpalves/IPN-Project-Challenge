(function () {
    'use strict';

    angular.module('app')
        .factory('userAccountService', ['$http', '$q', '$log', '$timeout', 'currentUser', userAccountService]);

    var apiUrl = 'https://localhost:44332';

    function userAccountService($http, $q, $log, currentUser) {
        return {
            registerUser: registerUser,
            loginUser: loginUser,
            logout: logout
        }

        function registerUser(newUser) {
            return $http.post(apiUrl + '/api/Account/Register', newUser, {
                transformRequest: function (data) {
                    data.newUser = true;
                    return JSON.stringify(data);
                }
            })
                .then(function (response) {
                    toastr.success("User added with success");
                    return 'User added: ' + response.config.data.Title;
                })
                .catch(function (response) {                    
                    return $q.reject(response);
                });
        }

        function loginUser(user) {
            return $http.post(apiUrl + '/token', user, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (data) {
                    var str = [];
                    for (var d in data) {
                        str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));                        
                    }
                    return str.join("&");
                }
            })
                .then(function (response) {
                    
                    return response.data;
                })
                .catch(function (response) {
                    if (response.status == -1) {
                        toastr.error("Incorrect email or password. Please correct to login...");
                    }
                    return $q.reject('Error login in user. (HTTP status: ' + response.status + ')');
                });
        }

        function logout() {
            return $http.post(apiUrl + '/api/Account/Logout', {
                headers: { 'Authorization': 'Bearer' + currentUser.getProfile().token }
            })
                .then(function (result) {
                    return result.data;
                })
                .catch(function (error) {
                    return error.data;
                })
        }

      
    }

    

})();