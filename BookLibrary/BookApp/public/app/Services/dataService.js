(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataService', ['$http', '$q', '$log', 'currentUser', dataService]);

    var apiUrl = 'https://localhost:44332';

    function dataService($http, $q, $log, currentUser) {
        return {
            getAllBooks: getAllBooks,
            getAllAuthors: getAllAuthors,
            getBookById: getBookById,
            addBook: addBook,
            editBook: editBook,
            deleteBook: deleteBook
        };

        function getAllBooks() {
            return $http.get(apiUrl + '/api/Books/', {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                })
                .then(function (result) {
                    return result.data;
                })
                .catch(function (response) {
                    $log.error('Error retrieving books: ' + response.status);
                    return $q.reject('Error Retrieving books.');
                });
        }

        function getAllAuthors() {
            return $http.get(apiUrl + '/api/authors/', {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                })
                .then(function (result) {
                    return result.data;
                })
                .catch(function (response) {
                    $log.error('Error retrieving authors: ' + response.statusText);
                    return $q.reject('Error Retrieving authors.');
                });
        }

        function getBookById(Id) {
            return $http.get(apiUrl + '/api/books/' + Id, {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                })
                .then(function (result) {
                    return result.data;
                })
                .catch(function (response) {
                    $log.error('Error retrieving books (' + Id + '): ' + response.statusText);
                    return $q.reject('Error Retrieving book.');
                });
        }

        function addBook(newBook) {
            return $http.post(apiUrl + '/api/books/', newBook, {
                transformRequest: function (data) { 
                    data.newBook = true;
                    console.log(data);
                    return JSON.stringify(data);
                },
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token } 
            })
                .then(function (response) {
                    return 'Book added: ' + response.config.data.Title;
                })
                .catch(function (response) {
                    return $q.reject(response);
                });
        }

        function editBook(book, Id) {
            return $http.put(apiUrl + '/api/books/' + Id, book, {
                transformRequest: function (data) {
                    data.book = true;
                    console.log(data);
                    return JSON.stringify(data);
                },
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }                
            })
                .then(function (response) {
                    return 'Book updated: ' + response.config.data.Title;
                })
                .catch(function (response) {
                    return $q.reject(response);
                });
        }

        function deleteBook(Id) {
            return $http.delete(apiUrl + '/api/books/' + Id, {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                })
                .then(function (result) {
                    $log.info(result);
                })
                .catch(function (response) {
                    return $q.reject(response);
                });
        }
    }
})();