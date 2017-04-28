/*
 * File per la definizione dei filtri Angular.
 */
define([
	'angular'
],
function(angular) {

	var commonFilters = angular.module('commonFilters', []);


	commonFilters.filter('tipogiocodecode', [TipoGiocoFilter]);
	function TipoGiocoFilter() {
		return function(input) {
			if(input == '1')
				return 'Giochi di carte organizzati in forma di torneo (art. 1 comma 1 del decreto)';
			else if(input == '2')
				return 'Giochi di sorte a quota fissa  (art. 1 comma 2 let. a) del decreto)';
			else if(input == '3')
				return 'Giochi di carte organizzati in forma diversa dal torneo (cash) (art. 1 comma 2 let. b) del decreto) TRADIZIONALE';
			else if(input == '4')
				return 'Giochi di carte organizzati in forma diversa dal torneo (cash) (art. 1 comma 2 let. b) del decreto) IN SOLITARIO';
			else if(input == '5')
				return 'Giochi di sorte a quota fissa di tipo istantaneo';
			else if(input == '6')
				return 'Bingo a distanza';
		};
	};
	
	commonFilters.filter('flag', [FlagFilter]);
	function FlagFilter() {
		return function(input) {
			if(input == '1')
				return 'SI';
			else
				return 'NO';
		};
	};
	
	commonFilters.filter('unique', [UniqueFilter]);
	function UniqueFilter() {
	    return function(input, key) {
	        var unique = {};
	        var uniqueList = [];
	        if(input){
	        for(var i = 0; i < input.length; i++){
	            if(typeof unique[input[i][key]] == "undefined"){
	                unique[input[i][key]] = "";
	                uniqueList.push(input[i]);
	            }
	        }
	        }
	        return uniqueList;
	    };
	}
	
	commonFilters.filter('capitalize', function() {
		return function(text) {
			var result = text;
			if (isNaN(text)) {
				result = text.charAt(0).toUpperCase() + text.substr(1);
			}
			return result;
		}
	});


	return commonFilters;
});
