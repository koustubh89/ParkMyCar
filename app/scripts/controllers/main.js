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

    $scope.sendLive = function(){
        $scope.live = !$scope.live;
        SuggestionService.getData('sendLive/'+$scope.now, false, 'get').then(function(response){
            $scope.carNumber = 0;
        });
        if($scope.live){
            $scope.showEditDetails = false;
        }else{
            $scope.showEditDetails = true;
        }
    }

    $scope.plusStatus = function(){
        $scope.carNumber++ ;
        var temp = {
            "ParkingId"             : $scope.parking,
            "ChangeInNumberOfCar"   : $scope.carNumber,
            "UserId"                : $scope.UserId
        };
        SuggestionService.getData('/AddTimeStamp', false, 'post', temp).then(function(response){});
    };

    $scope.minusStatus = function(){
        $scope.carNumber-- ;
        var temp = {
            "ParkingId"             : $scope.parking,
            "ChangeInNumberOfCar"   : $scope.carNumber,
            "UserId"                : $scope.UserId
        };
        SuggestionService.getData('/AddTimeStamp', false, 'post', temp).then(function(response){});
    };
}]);