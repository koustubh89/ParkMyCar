'use strict';
angular.module('newEagleApp')
.controller('freeUserCtrl', ["$scope","SuggestionService", "$interval", function ($scope, SuggestionService, $interval) {

	var generateSuggesstions = function(){
		SuggestionService.getLocationLatLong($scope.searchFor).then(function(response){
			console.log(response);
			$scope.suggestions = [];
			$scope.suggestions = response;
			$scope.currentSuggestion = $scope.suggestions[0];
		});
	}

	$scope.suggestions = [];

	$scope.availabilty 	= '28';
	$scope.currentSuggestion = '';

	var statusCall = function(){
		SuggestionService.getData('availabilityAndChart', false ,'get', {'':$scope.currentSuggestion.name}).then(function(response){
			$scope.chartData 	= response.chartData;
			$scope.availabilty 	= response.availabilty;
		});
	};

	$scope.changeSuggestion = function(idx){
		var place = _.findIndex($scope.suggestions, idx);
		$scope.currentSuggestion = $scope.suggestions[place];
		// statusCall();
	};

	$scope.searchChanged = function(value){
		generateSuggesstions(value);
	}

	// generateSuggesstions();
	// $interval(statusCall, 5000);
	
}]);
