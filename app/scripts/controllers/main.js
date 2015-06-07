'use strict';
angular.module('newEagleApp')
.controller('MainCtrl', ["$scope","SuggestionService", "$interval","$routeParams", function ($scope, SuggestionService, $interval, $routeParams) {
    
    $scope.now = $routeParams.parkingId;
    SuggestionService.getData('getParkingDetails/'+$scope.now, false, 'get').then(function(response){
    	$scope.parking = response;
    });
    $scope.parking = {
    	"parkingId"		:"id1",
    	"operatorName"	:"operatorName",
    	"name"			:"name1",
    	"capacity"		:"capacity"
    };
    $scope.showEditDetails = true;

    $scope.save = function(){
    	SuggestionService.getData('saveData', false, 'post', $scope.parking).then(function(success){
    		console.log('saved');
    	});
    		$scope.editName 		=  	false;
    		$scope.editCapacity		=  	false;
    		$scope.editOperatorName = 	false;
    };
}]);