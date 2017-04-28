/*
 * File di configurazione di RequireJS che si occupa di caricare tutti i moduli JS e le relative dipendenze
 * http://requirejs.org/docs/api.html
 */
require.config({
	/*
	 * Variabile per evitare la cache delle risorse da parte del browser. Il valore va cambiato a ogni deploy.
	 */
	urlArgs: 'v=1',
	baseUrl: 'scripts',
	waitSeconds: 0,
	paths: {
		'app' : 'app/app',
		'config' : 'app/config',
		'commonControllers' : 'app/controllers/common-controllers',
		'homeControllers' : 'app/controllers/home-controllers',
		'criterioControllers' : 'app/controllers/criterio-controllers',
		'videoControllers' : 'app/controllers/video-controllers',
		'testControllers' : 'app/controllers/test-controllers',
		'homeDirectives' : 'app/directives/home-directives',
		'commonFilters' : 'app/filters/common-filters',
		'messageServices' : 'app/services/message-services',
		'resourceServices' : 'app/services/resource-services',
		'networkServices' : 'app/services/network-services',
		'jquery' : 'libs/jquery.min',
//		'chart' : 'libs/Chart',
		'bootstrap' : 'libs/bootstrap.min',
		'angular' : 'libs/angular.min',
		'angularLocale' : 'libs/angular-locale_it-it',
		'angularRoute' : 'libs/angular-route.min',
		'stackframe' : 'libs/stackframe.min',
		'error-stack-parser' : 'libs/error-stack-parser.min',
		'angularAnimate' : 'libs/angular-animate',
		'angularuibootstrap' : 'libs/ui-bootstrap-tpls-1.3.2.min',
		'uploader': 'libs/uploader.min',
		'smart-table' : 'libs/smart-table',
//		'angularChart' : 'libs/angular-chart',
		'angularProgress' : 'libs/ngprogress-lite.min'
	},
	shim: {
		'jquery': {
			exports: 'jquery'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: 'bootstrap'
		},
		'angular': {
			deps: ['jquery'],
			exports: 'angular'
		},
		'angularLocale': {
			deps: ['angular'],
			exports : 'angularLocale'
		},
		'angularRoute': {
			deps: ['angular'],
			exports : 'angularRoute'
		},
		'ui-bootstrap': {
			deps: ['angular'],
			exports : 'ui-bootstrap'
		},
		'smart-table': {
			deps: ['angular'],
			exports : 'smart-table'
		},
		'angularAnimate': {
			deps: ['angular'],
			exports : 'angularAnimate'
		},
		'angularuibootstrap': {
			deps: ['angular'],
			exports : 'angularuibootstrap'
		},
		'uploader': {
			deps: ['angular'],
			exports : 'uploader'
		},
//		'angularChart': {
//			deps: ['angular','chart'],
//			exports : 'angularChart'
//		},
		'angularProgress': {
			deps: ['angular'],
			exports : 'angularProgress'
		}
    }
});

/*
 * Creazione del modulo dell'applicazione
 */
require(['angular', 'bootstrap', 'app'], function(angular) {
	angular.element(document).ready(function() {
		/*
		 * E' necessario inizializzare esplicitamente l'applicazione perche' si utilizza RequireJS.
		 * Altrimenti era sufficiente la direttiva ng-app nella index.html
		 */
		angular.bootstrap(document, ['AreaGiochiDemoApp']);
	});
});
