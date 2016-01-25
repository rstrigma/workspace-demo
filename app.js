/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */
/*Declare app level module which depends on other modules*/

var appUrl = 'https://ps-scholar.firebaseio.com/';
var workspaceRefUrl = 'https://ps-scholar.firebaseio.com/workspaceentires/';


angular.module('demoApp', [
    'ngRoute',
    'as.sortable',
	'firebase',
    'ui.bootstrap'
 ]).
  config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false); 
  }]).
  config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'views/kanban.html'});
    $routeProvider.when('/kanban', {templateUrl: 'views/kanban.html', controller: 'KanbanController'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]).
	controller('DemoController', ['$scope', '$location', '$firebaseObject', function ($scope, $location, $firebaseObject) {
		
		$scope.isActive = function (viewLocation) {
		var active = false;
		if ($location.$$path.indexOf(viewLocation) !== -1) {
			active = true;
		}
		return active;
    };

  }]);