'use strict';
angular.module('newEagleApp')
.factory("SuggestionService", function($http, $injector, $q) {

	var callback = function (results, status) {
	  	if (status == google.maps.places.PlacesServiceStatus.OK) {
	    	//for (var i = 0; i < results.length; i++) {
	      	//createMarker(results[i]);
	    	//}
	    	return results;
	  	}
	};
	var initialize = function(longitude, lattitude) {
	  	var pyrmont = new google.maps.LatLng(longitude, lattitude);

	  	var map = new google.maps.Map(document.getElementById('map-canvas'), {
	    	center: pyrmont,
	    	zoom: 15
	  	});

	  	var request = {
	    	location: pyrmont,
	    	radius: 1000,
	    	types: ['food']
	  	};
	  	// infowindow = new google.maps.InfoWindow();
	  	var service = new google.maps.places.PlacesService(map);
		// var result = service.nearbySearch(request, callback);
		var status =true;
		var finalResult = [];
		service.nearbySearch(request, function (results, status) {
		  	if (status == google.maps.places.PlacesServiceStatus.OK) {
		    	//for (var i = 0; i < results.length; i++) {
		      	//createMarker(results[i]);
		    	//}
		    	finalResult = results;
		  	}
		});
		// console.log(result);
		return finalResult;
	};


	return {
		getData : function(urlMethod, isServer, callType, params) {
			var q = $injector.get("$q");
			var deferred = $q.defer();
			var method = 'GET';
			if(callType == 'post'){
				method = 'POST';
				params = params;
			}
			if(isServer){
				var url = "" + urlMethod;
			}else{
				var url = "scripts/json/"+ urlMethod +".json";
			}

			$http({
				method	: method,
				url		: url,
				params 	: params
			}).success(function(data, status, headers, config) {
				if (data.error == undefined) {
					deferred.resolve(data);
				} else {
					if (data.error != undefined) {
						console.error("error: ", data.error)
					} else {
						deferred.reject(data);
					}
				}
			}).error(function() {
				console.error("error block");
			});		
			return deferred.promise;		
		},
		getLocationLatLong : function(address){
			var geocoder = new google.maps.Geocoder();
			var lat = '';
            var lng = '';
			//--------------------code for calculating the geocodes
		 	var status = true;
		  	
		  	var pyrmont = new google.maps.LatLng(24, 70);
		 	var map = new google.maps.Map(document.getElementById('map-canvas'), {
		    	center: pyrmont,
		    	zoom: 15
		  	});

            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
	                });
	                lat = results[0].geometry.location.lat();
	                lng = results[0].geometry.location.lng();
	                console.log(lng, lat);
	                var finalResult = initialize(lng, lat);
	                return finalResult;
                } else {
	                console.log('Geocode was not successful for the following reason: ' + status);
                    // alert('Geocode was not successful for the following reason: ' + status);
                }
        	});
		}
	};		
});
