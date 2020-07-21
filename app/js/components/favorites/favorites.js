angular.module("ideaWareMovies").controller("favoritesCtrl", favoritesCtrl);

function favoritesCtrl(
  $scope,
  $serviceMovie,
  $serviceSeries,
  $constants,
  $serviceFavorite,
  $sce
) {
  $scope.favorites = [];
  $scope.page = "favorites";
  $scope.path = $constants.pathPicture;
  $scope.showModal = false;
  $scope.video = $sce.trustAsResourceUrl("https://www.youtube.com/embed/");

  $scope.favorites = $serviceFavorite.getFavorites();

  $scope.toogleFavorite = function (value) {
    $serviceFavorite.removeFavorite(value.id);
    const index = $scope.favorites.findIndex(
      (favorite) => favorite.id === value.id
    );
    $scope.favorites.splice(index, 1);
    console.log($scope.favorites);
  };

  $scope.getVideo = function (favorite) {
    if (favorite.type == "SERIE") {
      $serviceSeries.getSerie(favorite.id).then(function (response) {
        $scope.showModal = true;
        $scope.video = $sce.trustAsResourceUrl(
          "https://www.youtube.com/embed/" + response.data.results[0].key
        );
      });
    }
    if (favorite.type == "MOVIE") {
      $serviceMovie.getMovie(favorite.id).then(function (response) {
        $scope.showModal = true;
        $scope.video = $sce.trustAsResourceUrl(
          "https://www.youtube.com/embed/" + response.data.results[0].key
        );
      });
    }
  };
}
