'use strict';
angular.module('newEagleApp')
.controller('freeUserCtrl', ["$scope","SuggestionService", "$interval", function ($scope, SuggestionService, $interval) {

	var generateSuggesstions = function(){
		$scope.suggestions = SuggestionService.getLocationLatLong($scope.searchFor);
	}

	$scope.availabilty 	= '28';
	$scope.currentSuggestion = '';

	var statusCall = function(){
		SuggestionService.getData('availabilityAndChart', false ,'get', {'':$currentSuggestion}).then(function(response){
			$scope.chartData 	= response.chartData;
			$scope.availabilty 	= response.availabilty;
		});
	};

	$scope.changeSuggestion = function(idx){
		$currentSuggestion = $scope.suggestions[idx];
		statusCall();
	};

	$scope.searchChanged = function(value){
		generateSuggesstions(value);
	}

	// generateSuggesstions();
	// $interval(statusCall, 5000);
	
}]);
