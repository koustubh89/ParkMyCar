'use strict';
angular.module('newEagleApp')
.controller('welcomeCtrl', ["$scope","SuggestionService", "$interval", function ($scope, SuggestionService, $interval) {

	$scope.findPlace = function(){

	};
	$scope.transferTo = function(){
		$scope.goingTo = '';
	};

}]);