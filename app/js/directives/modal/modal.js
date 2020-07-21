angular.module("ideaWareMovies").directive("appModal", appModal);

function appModal() {
  return {
    restrict: "E",
    templateUrl: "/js/directives/modal/modal.html",
    scope: {
      showModal: "=active",
      video: "=video",
    },
    controller: function ($scope, $sce) {
      $scope.closeModal = function () {
        $scope.video = $sce.trustAsResourceUrl(
          "https://www.youtube.com/embed/"
        );
        $scope.showModal = false;
      };
    },
  };
}
