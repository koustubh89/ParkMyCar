'use strict';
angular.module('newEagleApp')
.factory("SuggestionService", function($http, $injector, $q) {

	var map;
 var res =[];
 var initialize = function(lat,lng) {
  var pyrmont = new google.maps.LatLng(lat,lng);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: pyrmont,
    zoom: 15
  });

  var request = {
    location: pyrmont,
    radius: 2000,
    types: ['parking']
  };
  
  var service = new google.maps.places.PlacesService(map);
  var status = true;
  service.nearbySearch(request, callback);
};

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      res.push(results[i]);
    }
  }
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
	              initialize(lat, lng);
	                return res;
                } else {
	                console.log('Geocode was not successful for the following reason: ' + status);
                    // alert('Geocode was not successful for the following reason: ' + status);
                }
        	});
		}
	};		
});
