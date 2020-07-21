angular.module("ideaWareMovies").directive("appHeader", appHeader);

function appHeader() {
  return {
    restrict: "E",
    templateUrl: "/js/directives/header/header.html",
    scope: {
      page: "=active",
    },
  };
}
