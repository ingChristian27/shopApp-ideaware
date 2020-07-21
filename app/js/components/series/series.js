angular.module("ideaWareMovies").controller("seriesCtrl", seriesCtrl);

function seriesCtrl(
  $scope,
  $serviceSeries,
  $constants,
  $serviceFavorite,
  $sce
) {
  $scope.title = "";
  $scope.page = "series";
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

  $serviceSeries
    .getGenre()
    .then(function (response) {
      $scope.genres = response.data.genres;
    })
    .catch(function (err) {
      console.log(err);
    });

  $scope.years = $serviceSeries.getYears();

  $scope.findTitle = function (txt, page) {
    $scope.isFilter = false;
    $serviceSeries
      .getSeries(txt, page)
      .then(function (response) {
        const movies = mapMovies(response.data.results);
        $scope.movies = movies;
        if (movies.length == 0) {
          alert("Sorry no series were found related to these criteria");
        }
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
    $serviceSeries
      .getSerieByFilters(data)
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
      movie.release_date = movie.first_air_date;
      movie.type = "SERIE";
      return movie;
    });
    return movies;
  }

  $scope.getVideo = function (id) {
    $serviceSeries.getSerie(id).then(function (response) {
      $scope.showModal = true;
      $scope.video = $sce.trustAsResourceUrl(
        "https://www.youtube.com/embed/" + response.data.results[0].key
      );
    });
  };
}
