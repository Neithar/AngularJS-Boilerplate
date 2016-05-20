/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 *
 */
;(function () {

    angular
        .module('boilerplate')
        .controller('MainController', MainController);

    MainController.$inject = ['LocalStorage', 'QueryService', '$http', '$scope'];


    function MainController(LocalStorage, QueryService, $scope) {

        // 'controller as' syntax
        var self = this;

        self.pager = {};
        self.viewby = 5;
        self.currentPage = 1;
        self.itemsPerPage = self.viewby;


        self.movies = QueryService.query('GET', 'movies', {}, {})
            .then(function (success) {
                self.dummyItems = success.data.response; // dummy array of items to be paged
                self.totalItems = self.dummyItems.length;
                return success.data.response;
            }, function (error) {
                return error;
        });

        self.setPage = function (pageNo) {
            self.currentPage = pageNo;
        };

        self.pageChanged = function() {
            console.log('Page changed to: ' + self.currentPage);
        };

        self.setItemsPerPage = function(num) {
            self.itemsPerPage = num;
            self.currentPage = 1; //reset to first page
        }
    }

})();