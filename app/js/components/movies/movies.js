angular.module("ideaWareMovies").controller("moviesCtrl", moviesCtrl);

function moviesCtrl($scope, $serviceMovie, $constants, $serviceFavorite, $sce) {
  $scope.title = "";
  $scope.page = "movies";
  $scope.isFilter = false;
  $scope.years = [];
  $scope.genres = [];
  $scope.movies = [];
  $scope.path = $constants.pathPicture;
  $scope.currentPage = 1;
  $scope.total_count = 0;
  $scope.table_itemsPerPage = 20;
  $scope.showModal = false;
  $scope.video = $sce.trustAsResourceUrl("https://www.youtube.com/embed/");

  $serviceMovie
    .getGenre()
    .then(function (response) {
      $scope.genres = response.data.genres;
    })
    .catch(function (err) {
      console.log(err);
    });

  $scope.years = $serviceMovie.getYears();

  $scope.findTitle = function (txt, page) {
    $scope.isFilter = false;
    $serviceMovie
      .getMovies(txt, page)
      .then(function (response) {
        const movies = mapMovies(response.data.results);
        if (movies.length == 0) {
          alert("Sorry no movies were found related to these criteria");
        }
        $scope.movies = movies;
        $scope.currentPage = response.data.page;

        $scope.total_count = response.data.total_results;
      })
      .catch(function (err) {
        alert("Sorry there are an error, please try again");
      });
  };

  $scope.nexPage = function (page) {
    $scope.isFilter
      ? $scope.findByFilter($scope.year, $scope.genre, page)
      : $scope.findTitle($scope.title, page);
  };

  $scope.findByFilter = function (year, genre, page) {
    if (year !== undefined && genre !== undefined) {
      $scope.title = "";
      $scope.isFilter = true;
      data = {
        year: year,
        genre: genre.id,
        page: page,
      };
      callServiceFindByFilter(data);
    }
  };

  callServiceFindByFilter = function (data) {
    $serviceMovie
      .getMovieByFilters(data)
      .then(function (response) {
        const movies = mapMovies(response.data.results);
        $scope.movies = movies;
        $scope.currentPage = response.data.page;
        $scope.total_count = response.data.total_results;
      })
      .catch(function (err) {
        alert("Sorry there are an error, please try again");
      });
  };

  function mapMovies(movies) {
    movies.map((movie) => {
      const isMovie = $serviceFavorite.getFavorite(movie.id);
      isMovie ? (movie.favorite = true) : (movie.favorite = false);
      movie.type = "MOVIE";
      return movie;
    });
    return movies;
  }

  $scope.getVideo = function (id) {
    $serviceMovie.getMovie(id).then(function (response) {
      $scope.showModal = true;
      $scope.video = $sce.trustAsResourceUrl(
        "https://www.youtube.com/embed/" + response.data.results[0].key
      );
    });
  };
}
