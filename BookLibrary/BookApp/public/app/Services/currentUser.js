(function () {
    'use strict';

    angular
        .module('app')
        .factory('currentUser', currentUser);    

    function currentUser() {

        var profile = {
            isLoggedIn: false,
            username: "",
            token: "",
        };

        return {
            setProfile: setProfile,
            getProfile: getProfile
        }        

        function setProfile (username, token) {
            profile.username = username;
            profile.token = token;
            profile.isLoggedIn = true;
        };

        function getProfile () {
            return profile;
        };        
    }
})();