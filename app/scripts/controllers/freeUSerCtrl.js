'use strict';
angular.module('newEagleApp')
.controller('freeUserCtrl', ["$scope","SuggestionService", "$interval","$routeParams", function ($scope, SuggestionService, $interval, $routeParams) {

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
	};

	var directionsDisplay;
	var directionsService;
	var stepDisplay;
	var markerArray = [];
	var marker;
	var map;
	var displayPath = function(){
		var start = $scope.currentSuggestion.name;
		var end = "Vasant Kunj";
		var initial = new google.maps.LatLng(27.99999, 77.9741874);
		var mapOptions = {
    		zoom: 13,
    		center: initial
  		}
  		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		directionsService = new google.maps.DirectionsService();
		var rendererOptions = {
    		map: map
  		}
  		directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

		for (var i = 0; i < markerArray.length; i++) {
			markerArray[i].setMap(null);
		}
		markerArray = [];
		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.WALKING
		};
		directionsService.route(request, function(response, status) {
		    if (status == google.maps.DirectionsStatus.OK) {
		    	directionsDisplay.setDirections(response);
			    showSteps(response);
			}
		});
	};

	function showSteps(directionResult) {
		var myRoute = directionResult.routes[0].legs[0];
	  	for (var i = 0; i < myRoute.steps.length; i++) {
		     marker = new google.maps.Marker({
			    position: myRoute.steps[i].start_location,
	    		map: map
	    	});
	    	attachInstructionText(marker, myRoute.steps[i].instructions);
	    	markerArray[i] = marker;
	  	}
	};
	function attachInstructionText(marker, text) {
		google.maps.event.addListener(marker, 'click', function() {
	    	stepDisplay.setContent(text);
	    	stepDisplay.open(map, marker);
	  	});
	};

	$scope.getCurrentLocation = function(){
		displayPath();
	}

	$scope.searchFor = $routeParams.search;
	console.log($routeParams.search);
	$scope.searchChanged();
	
}]);
