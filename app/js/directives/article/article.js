angular.module("ideaWareMovies").directive("appArticle", appHeader);

function appHeader() {
  return {
    restrict: "E",
    templateUrl: "/js/directives/article/article.html",
    scope: true,
    controller: function ($scope, $element, $serviceFavorite, $serviceMovie) {
      $scope.toogleFavorite = function (movie) {
        $serviceFavorite.toogleFavorite(movie.id, movie);
        $scope.movie.favorite = !movie.favorite;
      };
    },
  };
}
