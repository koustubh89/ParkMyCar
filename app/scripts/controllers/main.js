'use strict';
angular.module('newEagleApp')
.controller('MainCtrl', ["$scope","SuggestionService", "$interval","$routeParams", "$timeout",function ($scope, SuggestionService, $interval, $routeParams,$timeout ) {
    
    $scope.now = $routeParams.parkingId;
    // SuggestionService.getData('getParkingDetails/'+$scope.now, false, 'get').then(function(response){
    // 	$scope.parking = response;
    // });
    $scope.parking = {
    	"parkingId"		:"id1",
    	"operatorName"	:"operatorName",
    	"name"			:"name1",
    	"capacity"		:"80"
    };
    $scope.showEditDetails = true;
    $scope.carNumber = 23;
    var drawPieChart = function(empty, filled){
        $('#chartContainer').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Parking space'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Parking space',
                data: [
                    ['Empty',   empty],
                    ['Filled',  filled]
                ]
            }]
        });
    };
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
        SuggestionService.getData('toggleParking/'+$scope.now, true, 'get').then(function(response){
            $scope.carNumber = 0;
        });
        if($scope.live){
            $scope.showEditDetails = false;
        }else{
            $scope.showEditDetails = true;
        }
    }

    $scope.showChart = function(){
        $scope.showEditDetails = false;
        drawPieChart( $scope.parking.capacity - $scope.carNumber,$scope.carNumber);
    };
    $scope.filled = false;
    $scope.emptied = false;
    $scope.plusStatus = function(){
        $scope.carNumber++ ;
        var temp = {
            "ParkingId"             : $scope.parking,
            "ChangeInNumberOfCar"   : $scope.carNumber,
            "UserId"                : $scope.UserId
        };
        SuggestionService.getData('AddTimeStamp', true, 'post', temp).then(function(response){});
        $scope.showChart();
        $scope.filled = true;
        $timeout(function(){$scope.filled = false;}, 2000);
    };

    $scope.minusStatus = function(){
        $scope.carNumber-- ;
        var temp = {
            "ParkingId"             : $scope.parking,
            "ChangeInNumberOfCar"   : $scope.carNumber,
            "UserId"                : $scope.UserId
        };
        SuggestionService.getData('AddTimeStamp', true, 'post', temp).then(function(response){});
        $scope.showChart();
        $scope.emptied = true;
        $timeout(function(){$scope.emptied = false;}, 2000)
    };

}]);