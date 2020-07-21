function serviceMovie($q, $http, $constants) {
  return {
    getMovies: getMovies,
    getGenre: getGenre,
    getMovieByFilters: getMovieByFilters,
    getYears: getYears,
    getMovie: getMovie,
  };

  function getMovies(key, page) {
    var defered = $q.defer();
    var promise = defered.promise;

    $http({
      method: "GET",
      url:
        $constants.base +
        "search/movie" +
        $constants.api_key +
        "&query=" +
        key +
        "&page=" +
        page,
    }).then(
      function (response) {
        defered.resolve(response);
      },
      function (error) {
        defered.reject(error);
      }
    );

    return promise;
  }

  function getMovieByFilters(data) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http({
      method: "GET",
      url:
        $constants.base +
        "discover/movie" +
        $constants.api_key +
        "&page=" +
        data.page +
        "&primary_release_year=" +
        data.year +
        "&with_genres=",
    }).then(
      function (response) {
        defered.resolve(response);
      },
      function (error) {
        defered.reject(error);
      }
    );

    return promise;
  }
  function getYears() {
    var years = [];
    for (var i = 2020; i >= 1950; i--) {
      years.push(i);
    }
    return years;
  }

  function getMovie(id) {
    var defered = $q.defer();
    var promise = defered.promise;

    $http({
      method: "GET",
      url: $constants.base + "movie/" + id + "/videos" + $constants.api_key,
    }).then(
      function (response) {
        defered.resolve(response);
      },
      function (error) {
        defered.reject(error);
      }
    );

    return promise;
  }

  function getGenre(key) {
    var defered = $q.defer();
    var promise = defered.promise;

    $http({
      method: "GET",
      url: $constants.base + "genre/movie/list" + $constants.api_key,
    }).then(
      function (response) {
        defered.resolve(response);
      },
      function (error) {
        defered.reject(error);
      }
    );

    return promise;
  }
}
angular.module("ideaWareMovies").service("$serviceMovie", serviceMovie);
