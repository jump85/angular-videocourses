/*
 * File di configurazione dell'applicazione per la definizione delle costanti globali
 */
define([
    'angular'
],
function(angular) {

	var configModule = angular.module('configModule', []);

	var CONTEXT_ROOT_WEB = '/AreaGiochiDemoWeb/';

	/*
	 * URL per i servizi di autenticazione
	 */
	var CONTEXT_USER_SERVICE = '/LoginWeb/';

	/*
	 * URL per richiamare i servizi REST
	 */
	var CONTEXT_REST_SERVICE = '/AreaGiochiDemoWeb/jaxrs/';
	var CONTEXT_JSON = '/AreaGiochiDemoWeb/json/';


	/*
	 * Variabili per evitare la cache delle risorse da parte del browser. Il valore va cambiato a ogni deploy.
	 */
	var urlParamsValue = "1";
	var urlArgs = "?v=" + urlParamsValue;

	var CONSTANTS = {
		'URL_ARGS' : urlArgs,
		'HOME_PAGE' : CONTEXT_ROOT_WEB,
		'LOGIN_PAGE' : CONTEXT_ROOT_WEB + 'login.html',
		'ERROR_PAGE' : CONTEXT_ROOT_WEB + 'error.html',
		'ELENCO' : 'elenco/',
		'SMARTPHONE' : CONTEXT_REST_SERVICE + 'fornitori/',
		'CRITERIO' : CONTEXT_REST_SERVICE + 'criterio/',
		'CERCA_CRITERIO_PAGE' : '#/cercaFornitori',
		'DETT_CRITERIO_PAGE' : '#/dettaglioFornitore/',
		'INS_CRITERIO_PAGE' : '#/insCriterio',
		'ELENCO_CRITERI_PAGE' : '#/elencoCriteri',
		'UPD_CRITERIO_PAGE' : '#/updFornitore/',
    'VIDEO_PAGE' : '#/video/',
		'USER_INFO' : CONTEXT_USER_SERVICE + 'jaxrs/userData',
		'LOGOUT' : CONTEXT_USER_SERVICE + 'logout',
		'INSSUCCESSMSG' : 'Inserimento avvenuto con successo',
		'UPDSUCCESSMSG' : 'Aggiornamento avvenuto con successo',
		'NORESULTMSG' : 'Nessun risultato corrispondente ai criteri di ricerca',
		'JSON' : CONTEXT_JSON
	};

	configModule.constant('CONSTANTS', CONSTANTS);

	return configModule;
});
