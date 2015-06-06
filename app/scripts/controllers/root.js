'use strict';
angular.module('newEagleApp')
.controller('root', ["$scope","SuggestionService", "$interval","$location", function ($scope, SuggestionService, $interval, $location) {


	$scope.submitLoginDetails = function(){
		console.log('logging in with', $scope.details);	
		SuggestionService.getData('login', true ,'post', $scope.details).then(function(response){
			$scope.id = response;
		});
		$routeParams.userId = $scope.id;
		$location.path('/registeredUser/'+$scope.id);
	};

}]);