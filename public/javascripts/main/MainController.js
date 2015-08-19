'use strict';

angular.module('trackerDemo.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'javascripts/main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$scope', function($scope) {
  $scope.entry = {};
  $scope.storage = {};

  /**
   * Event handler for form submit. Add the entry to the client storage and
   * redraw the chart.
   */
  $scope.addEntry = function() {
    /**
     * This needs more input validation, i.e. try to parse integers here and
     * alert for invalid types.
     */
    for (var k in $scope.entry) {
      if ($scope.entry[k] === null) {
        alert(k + ' was left blank');
        return;
      }
    }
    var month = $scope.entry.date.getMonth();
    var obj = {};
    obj[month] = parseInt($scope.entry.timeSpent);

    if ($scope.storage[$scope.entry.project] === undefined) {
      $scope.storage[$scope.entry.project] = obj;
    }
    else if ($scope.storage[$scope.entry.project][month] === undefined) {
      $scope.storage[$scope.entry.project][month] = parseInt($scope.entry.timeSpent);
    }
    else {
      $scope.storage[$scope.entry.project][month] += parseInt($scope.entry.timeSpent);
    }

    /**
     * ChartJS line graphs don't seem to have concepts of time, more work needs
     * to be done here to support multi-year entries.
     */
    var data = {
      labels: ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"]
    }

    var datasets = [];
    for (var project in $scope.storage) {
      var set = { label: project }
      var times = [];
      for (var i = 0; i < 12; i++) {
        if ($scope.storage[project][i] === undefined) {
          times.push(0);
        }
        else {
          times.push($scope.storage[project][i]);
        }
      }
      set['data'] = times;
      set['fillColor'] = "rgba(" + Math.floor((Math.random() * 255)) + "," + Math.floor((Math.random() * 255)) + "," + Math.floor((Math.random() * 255)) + ",0.2)";
      datasets.push(set);
    }
    data['datasets'] = datasets;
  
    var ctx = document.getElementById("trackerChart").getContext("2d");
    var trackerChart;
    if (trackerChart === undefined) {
      trackerChart = new Chart(ctx).Line(data);
    }
    else {
      trackerChart.update();
    } 

    $scope.entry = {};
  }
}]);