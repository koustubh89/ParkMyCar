'use strict';

/**
 * @ngdoc function
 * @name newEagleApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the newEagleApp
 */
angular.module('newEagleApp')
	.controller('SMCtrl', function ($scope) {
		$scope.dataPages = [{
			'pageId' : '',
			'pageName': '',
			'creator'	: '',
			'dataModel'	: '',
			'modified'	: '',
			'isPublished': true,
			Category: "category 1",
			link: "hrefLink"   
		}];
  	});