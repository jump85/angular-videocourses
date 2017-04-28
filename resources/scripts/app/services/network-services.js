/*
 * File per la definizione dei Service Angular, ovvero oggetti che espongono funzionalita' condivise tra diversi Controller:
 * https://code.angularjs.org/1.4.3/docs/guide/services
 */
define([
	'angular'
],
function(angular) {

	var networkServices = angular.module('networkServices', ['configModule']);

	networkServices.factory('StatusCodeInterceptorService', ['$q', '$window', 'CONSTANTS', StatusCodeInterceptorService]);

	/*
	 * Catch degli status code HTTP e redirect in funzione del codice
	 */
	function StatusCodeInterceptorService($q, $window, CONSTANTS) {
		return {
			'request' : function(config) {
				return config;
			},
			'requestError' : function(rejection) {
				return $q.reject(rejection);
			},
			'response' : function(response) {
				return response;
			},
			'responseError' : function(response) {
				var status = response.status;

				switch (status) {
				/*
				 * In caso di codice -1 (il server non risponde), 0 (non parte la chiamata Ajax dal browser) o 404,
				 * si rimanda sulla pagina di errore
				 */
				case -1:
				case 0:
				case 404:
					//$window.location.href = CONSTANTS.ERROR_PAGE;
					console.log(response);
					break;
				/*
				 * In caso di codice 401 o 403, si rimanda sulla pagina di login
				 */
				case 401:
				case 403:
					$window.location.href = CONSTANTS.LOGIN_PAGE;
					break;
				default:
					return $q.reject(response);
				}
			}
		};
	};

	return networkServices;
});
