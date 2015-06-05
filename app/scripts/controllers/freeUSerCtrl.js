'use strict';
angular.module('newEagleApp')
.controller('freeUserCtrl', ["$scope","SuggestionService", "$interval", function ($scope, SuggestionService, $interval) {

	var generateSuggesstions = function(){
		SuggestionService.getData('getSuggestions', false, 'get', {'search': $scope.searchFor}).then(function(response){
			$scope.suggestions = response;
		});
	}

	var statusCall = function(){
		SuggestionService.getData('availabilityAndChart', false ,'get').then(function(response){
			$scope.chartData 	= response.chartData;
			$scope.availabilty 	= response.availabilty;
		});
	};

	$scope.changeSuggestion = function(){
		statusCall();
	};

	generateSuggesstions();
	// $interval(statusCall, 5000);
	
}]);
