function serviceSeries($q, $http, $constants) {
  return {
    getSeries: getSeries,
    getGenre: getGenre,
    getSerieByFilters: getSerieByFilters,
    getYears: getYears,
    getSerie: getSerie,
  };

  function getSeries(key, page) {
    var defered = $q.defer();
    var promise = defered.promise;

    $http({
      method: "GET",
      url:
        $constants.base +
        "search/tv" +
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

  function getSerieByFilters(data) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http({
      method: "GET",
      url:
        $constants.base +
        "discover/tv" +
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

  function getSerie(id) {
    var defered = $q.defer();
    var promise = defered.promise;

    $http({
      method: "GET",
      url: $constants.base + "tv/" + id + "/videos" + $constants.api_key,
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
angular.module("ideaWareMovies").service("$serviceSeries", serviceSeries);
