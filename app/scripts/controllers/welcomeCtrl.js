'use strict';
angular.module('newEagleApp')
.controller('welcomeCtrl', ["$scope","SuggestionService", "$interval","$location", function ($scope, SuggestionService, $interval, $location) {

	$scope.findPlace = function(){

	};
	$scope.transferTo = function(){
		//$scope.goingTo = '';
		console.log('reached');
		$location.path('/suggestions/'+$scope.goingTo);
	};

}]);