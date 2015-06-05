'use strict';
angular.module('newEagleApp')
.factory("SuggestionService", function($http, $injector, $q) {
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
		}		
	};		
});
