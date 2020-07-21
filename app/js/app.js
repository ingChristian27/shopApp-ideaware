angular
  .module("ideaWareMovies", [
    "ngRoute",
    "angularUtils.directives.dirPagination",
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/js/components/movies/movies.html",
        constroller: "/js/components/movies/movies.js",
      })
      .when("/movies", {
        templateUrl: "/js/components/movies/movies.html",
        constroller: "/js/components/movies/movies.js",
      })
      .when("/series", {
        templateUrl: "/js/components/series/series.html",
        constroller: "/js/components/series/series.js",
      })
      .when("/favorites", {
        templateUrl: "/js/components/favorites/favorites.html",
        constroller: "/js/components/favorites/favorites.js",
      });
  });
