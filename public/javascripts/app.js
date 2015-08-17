'use strict';

// Declare app level module which depends on views, and components
angular.module('trackerDemo', [
  'ngRoute',
  'trackerDemo.main'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/trackerDemo'});
}]);