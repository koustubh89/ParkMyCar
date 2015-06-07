'use strict';
angular.module('newEagleApp')
.controller('root', ["$scope","SuggestionService", "$interval","$location", "$routeParams", function ($scope, SuggestionService, $interval, $location, $routeParams) {


	$scope.submitLoginDetails = function(){
		console.log('logging in with', $scope.details);	
		SuggestionService.getData('login', true ,'post', $scope.details).then(function(response){
			$scope.id = response;
		});
		$routeParams.userId = $scope.id;
		$location.path('/registeredUser/'+$scope.id);
	};

	$scope.submitSignupDetails = function(){
		$scope.newParking.IsOpenTody = false;
		$scope.newParking.NumberOfCurrentVehicles  = 0;
		
		$scope.newParking.latitude  = 0;
		$scope.newParking.longitude  = 0;
		SuggestionService.getData($scope.newParking.address).then(function(response){
			$scope.newParking.latitude  = response[0];
			$scope.newParking.longitude  = response[1];
		});

		console.log('signing up with', $scope.newParking);
		SuggestionService.getData('RegisterParking', true, 'post', $scope.newParking).then(function(result){
			$scope.parking.id 		= result.ParkingId;
			$scope.parking.UserId 	= result.UserId;
			$location.path('/registeredUser/'+$scope.parking.id);
		});
	};
}]);