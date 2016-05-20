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

    MainController.$inject = ['LocalStorage', 'QueryService', 'pagerService', '$http', '$scope'];


    function MainController(LocalStorage, QueryService, pagerService, $scope) {

        // 'controller as' syntax
        var self = this;

        self.viewby = 25;
        self.currentPage = 1;
        self.itemsPerPage = self.viewby;
        self.maxSize = 5
        self.pager = {};
        self.setPage = setPage;

        self.movies = QueryService.query('GET', 'movies', {'page': self.currentPage}, {})
            .then(function (success) {
                self.dummyItems = success.data.response; // dummy array of items to be paged
                self.totalItems = success.data.pagination.count;
                self.setPage(1);
                return success.data.response;
            }, function (error) {
                return error;
            });

        function setPage(page) {
            if (page < 1 || page > self.pager.totalPages) {
                return;
            }
            self.page = page;

            // get pager object from service
            self.pager = pagerService.GetPager(self.totalItems, page);

            // get current page of items
            self.movies =
                QueryService.query('GET', 'movies', {'page': self.page}, {})
                    .then(function (success) {
                        self.dummyItems = success.data.response; // dummy array of items to be paged
                        return success.data.response;
                    }, function (error) {
                        return error;
                    });
        }
    }

})();