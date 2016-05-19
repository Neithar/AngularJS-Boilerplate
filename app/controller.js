/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  MainController.$inject = ['LocalStorage', 'QueryService', 'pagerService', '$http', '$scope'];


  function MainController(LocalStorage, QueryService, pagerService, $scope) {

    // 'controller as' syntax
    var self = this;

    self.dummyItems = _.range(1, 151); // dummy array of items to be paged
    self.pager = {};
    self.setPage = setPage;
    self.setPage(1);

      function setPage(page) {
          if (page < 1 || page > self.pager.totalPages) {
              return;
          }

          // get pager object from service
          self.pager = pagerService.GetPager(self.dummyItems.length, page);

          // get current page of items
          self.items = self.dummyItems.slice(self.pager.startIndex, self.pager.endIndex);
      }

    this.movies = QueryService.query('GET', 'movies', {}, {})
        .then(function(data) {
          console.log(data);
        }, function(error) {
        console.log(error);
    });

    ////////////  function definitions
      

      /**
     * Load some data
     * @return {Object} Returned object
     */
    // QueryService.query('GET', 'posts', {}, {})
    //   .then(function(ovocie) {
    //     self.ovocie = ovocie.data;
    //   });
  }


})();