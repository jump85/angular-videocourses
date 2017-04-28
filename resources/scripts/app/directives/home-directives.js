/*
 * File per la definizione delle direttive Angular:
 * https://code.angularjs.org/1.4.3/docs/guide/directive
 */

define([
	'angular'
],
function(angular) {

	var homeDirectives = angular.module('homeDirectives', []);


	homeDirectives.directive("nttMenu", function() {
		return {
			restrict: "E",
			templateUrl: "views/partials/directives/menu.html",
			transclude: true,
//			scope: {
//				menuList: "=",
//				infoUtente: "=",
//				titolo: "@",
////				pushStackElement: "&",
//				logout: "&"
//			},
//			link: function(scope, element, attributes) {
//				console.log(scope);
//			}
		}
	});
	
	homeDirectives.directive("nttBc", function() {
		return {
			restrict: "E",
			templateUrl: "views/partials/directives/breadcrumb.html"
		};
	});

	return homeDirectives;
});

