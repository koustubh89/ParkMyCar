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

	$scope.values = [{
        name: $scope.currentSuggestion.name,
        data: [3, 7, 21, 14]
    }];
    $scope.values[0].data = [];
    for(var i =0;i<=3;i++){
    	var t = Math.floor(Math.random() * 100) + 1;
	    $scope.values[0].data.push(t);
    }

	var plotLineChart = function(values){
		$('#lineChart').highcharts({
	        title: {
	            text: 'Parking occupancy stats at '+$scope.currentSuggestion.name+' during last 4 hours',
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'Fetching latest parking status just for you',
	            x: -20
	        },
	        xAxis: {
	            categories: ['5pm','6pm','7pm','8pm']
	        },
	        yAxis: {
	            title: {
	                text: 'Occupancy'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: ''
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: values 
	    });
	};
	$scope.getRate = function( ){
		$scope.showChart = true;
		// SuggestionService.getData('GetTimeStampById'+$scope.currentSuggestion.id).then(function(response){
		// 	$scope.values = response
		// });
		plotLineChart($scope.values);
	};
	$scope.changeSuggestion = function(idx){
		var place = _.findIndex($scope.suggestions, idx);
		$scope.currentSuggestion = $scope.suggestions[place];
		$scope.showChart = false;
		// statusCall();
		// $scope.values[0].data = [];
	 //    for(var i =0;i<=3;i++){
	 //    	var t = Math.floor(Math.random() * 100) + 1;
		//     $scope.values[0].data.push(t);
	 //    }
		$scope.getRate();
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
	};

	$scope.searchFor = $routeParams.search;
	console.log($routeParams.search);
	$scope.searchChanged();
	
}]);
