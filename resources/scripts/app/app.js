/*
 * File principale dell'applicazione.
 * Definizione delle dipendenze.
 */
define([
	'angular',
	'error-stack-parser',
	'angularLocale',
	'angularRoute',
	'config',
	'commonControllers',
	'homeControllers',
	'criterioControllers',
	'videoControllers',
	'testControllers',
	'homeDirectives',
	'commonFilters',
	'messageServices',
	'resourceServices',
	'networkServices',
	'angularAnimate',
	'angularuibootstrap',
	'uploader',
	'smart-table',
	'angularProgress'
],
function(angular, ErrorStackParser) {
	/*
	 * Best practice
	 */
	'use strict';

	/*
	 * Creazione del nuovo modulo dell'applicazione.
	 * Il nome deve essere lo stesso nome utilizzato nel main.js
	 * Il secondo parametro definisce le dipendenze dei moduli definiti nei file JS.
	 */
	var app = angular.module('AreaGiochiDemoApp', [
	    'ngLocale',
		'ngRoute',
		'configModule',
		'commonControllers',
		'homeControllers',
		'criterioControllers',
		'videoControllers',
		'testControllers',
		'homeDirectives',
		'commonFilters',
		'messageServices',
		'resourceServices',
		'networkServices',
		'ngAnimate',
		'ui.bootstrap',
		'ui.uploader',
		'smart-table',
		'ngProgressLite'
		//'chart.js'
	]);

	app.config(['$routeProvider', '$httpProvider', '$logProvider', 'CONSTANTS', /*'ChartJsProvider' ,*/
		function($routeProvider, $httpProvider, $logProvider, CONSTANTS/*, ChartJsProvider*/) {
		// ChartJsProvider.setOptions({ colours : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
		/*
		 * Abilita/disabilita i log di debug
		 */
		$logProvider.debugEnabled(true);

		var urlArgs = CONSTANTS.URL_ARGS;

	    if (!$httpProvider.defaults.headers.get) {
	        $httpProvider.defaults.headers.get = {};
	    }
	    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
	    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

		/*
		 * Definizione delle URL, a ogni URL corrispondono una View e un Controller.
		 */
		$routeProvider.
			when('/', {
				/*
				 * View, partial HTML
				 */
				templateUrl: 'views/partials/homepage.html' + urlArgs,
				/*
				 * Controller, definito in home-controllers.js
				 */
				controller: 'HomeCtrl',
				/*
				 * Opzione per agevolare la scrittura dei Controller.
				 * http://toddmotto.com/digging-into-angulars-controller-as-syntax/
				 */
				controllerAs: 'vm'
			}).
			when('/cercaFornitori', {
				templateUrl: 'views/partials/cercaFornitori.html' + urlArgs,
				controller: 'CercaFornitoriCtrl',
				controllerAs: 'vm'
			}).
			when('/insCriterio', {
				templateUrl: 'views/partials/formCriterio.html' + urlArgs,
				controller: 'InsCriterioCtrl',
				controllerAs: 'vm'
			}).
			when('/elencoCriteri', {
				templateUrl: 'views/partials/elencoCriteri.html' + urlArgs,
				controller: 'ElencoCriteriCtrl',
				controllerAs: 'vm'
			}).
			when('/updFornitore/:id', {
				templateUrl: 'views/partials/formFornitori.html' + urlArgs,
				controller: 'UpdFornitoreCtrl',
				controllerAs: 'vm'
			}).
			when('/dettaglioFornitore/:id', {
				templateUrl: 'views/partials/dettaglioFornitore.html' + urlArgs,
				controller: 'DettFornitoreCtrl',
				controllerAs: 'vm'
			}).
			when('/insCriticita', {
				templateUrl: 'views/partials/formCriticita.html' + urlArgs,
				controller: 'InsCriticitaCtrl',
				controllerAs: 'vm'
			}).
			when('/cercaTipoCategoria', {
				templateUrl: 'views/partials/cercaTipoCategoria.html' + urlArgs,
				controller: 'CercaCategoriaCtrl',
				controllerAs: 'vm'
			}).
			when('/insCategoria', {
				templateUrl: 'views/partials/formTipoCategoria.html' + urlArgs,
				controller: 'InsCategoriaCtrl',
				controllerAs: 'vm'
			}).
			when('/video', {
				templateUrl: 'views/partials/video.html' + urlArgs,
				controller: 'VideoCtrl',
				controllerAs: 'vm'
			}).
			when('/responsive', {
				templateUrl: 'resources/views/partials/responsive.html' + urlArgs
			}).
			otherwise({
				redirectTo: '/'
		});

		/*
		 * Iniezione di un Service per la gestione custom delle chiamate HTTP.
		 * Il Service e' definito in network-services.js
		 */
		$httpProvider.interceptors.push('StatusCodeInterceptorService');

	}]);

	/*
	 * Override della gestione delle eccezioni di AngularJS.
	 * In questo modo si possono effettuare elaborazioni aggiuntive al flusso standard.
	 */
	app.config(['$provide', function ($provide) {
		$provide.decorator('$exceptionHandler', ['$delegate','$log', function ($delegate, $log) {
			return function(exception, cause) {
				/*
				 * Stampo l'eccezione prima di procedere con il flusso standard
				 */
				var stacktrace = ErrorStackParser.parse(exception);
				$log.debug(angular.toJson(stacktrace));

				/*
				 * Chiamata all'oggetto standard $exceptionHandler di AngularJS
				 */
				$delegate(exception, cause);
			};
		}]);
	}]);

	/*
	 * Metodo per eseguire funzioni dopo che l'applicazione e' stata lanciata
	 */
	app.run(['$rootScope', 'MessageService', function($rootScope, MessageService) {
		/*
		 * Intercetto l'evento che notifica il cambio di rotta.
		 * L'evento viene emesso da Angular
		 */
		$rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
			/*
			 * Richiamo il servizio per cancellare eventuali messaggi a ogni cambio di rotta
			 */
			MessageService.clearMessages();
	    });
	}]);

	return app;
});
