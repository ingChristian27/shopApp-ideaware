function serviceFavorite() {
  return {
    getFavorites: getFavorites,
    toogleFavorite: toogleFavorite,
    getFavorite: getFavorite,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };
  function toogleFavorite(key, value) {
    isValue = getFavorite(key);
    isValue ? removeFavorite(key) : addFavorite(key, value);
    values = getFavorites();
  }

  function getFavorites() {
    var favorites = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      favorites.push(getFavorite(keys[i]));
    }
    return favorites;
  }

  function addFavorite(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function removeFavorite(key) {
    window.localStorage.removeItem(key);
  }

  function getFavorite(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }
}
angular.module("ideaWareMovies").service("$serviceFavorite", serviceFavorite);
