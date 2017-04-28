/*
 * File per la definizione dei Service Angular, ovvero oggetti che espongono funzionalita' condivise tra diversi Controller:
 * https://code.angularjs.org/1.4.3/docs/guide/services
 * 
 * DISCLAIMER:
 * 
 * La promise come dice la parola stessa e' una 'promessa', associata a un'operazione asincrona la cui terminazione non e' nota a priori. 
 * Dal punto di vista applicativo la promise e' un oggetto contenitore vuoto sul quale si possono invocare due metodi: then() e when().
 * Il metodo then() prende come argomento una funzione (callback) che viene eseguita solo dopo che la promise e' stata 'risolta'. 
 * Nel caso di una chiamata Ajax, la promise e' 'risolta' una volta che e' stata ricevuta la risposta dal server.
 * 
 * AngularJS utilizza l'oggetto $q per gestire le promise. 
 * L'oggetto $q offre il metodo defer().
 * L'invocazione di questo metodo 'ritorna' un oggetto defer il cui scopo e' quello di esporre e gestire il ciclo di vita di una promise.
 * Con ciclo di vita si intende la possibiltia' di poter 'riempire' la promise con i dati reali al termine di una chiamata asincrona. 
 * 
 * https://code.angularjs.org/1.4.3/docs/api/ng/service/$q
 */
define([
	'angular'
],
function(angular) {

	var resourceServices = angular.module('resourceServices', ['configModule']);

	resourceServices.service('ResourceService', ['$q', '$http', '$log', '$rootScope', 'CONSTANTS', ResourceService]);
	resourceServices.service('Resolver',['$q', Resolver]);

    /*
	 * Service che offre un punto di accesso unico per definire chiamate Ajax verso il back-end
     */
	function ResourceService($q, $http, $log, $rootScope, CONSTANTS) {

		var _promises = {};

        var _genericCallback = function(key, data) {
            _promises[key] = data;
        };

        /*
         * Funzione privata di utilita' che permette di ottenere i dati dal server solo quando escplicitamente richiesto o necessario
         */
        var _promisesGetter = function(URL, data, key, refresh) {
            if (!refresh && _promises[key] !== undefined) {
            	/*
            	 * Se il parametro refresh e' 'false' o il dato e' gia' presente, viene semplicemente restituito al Controller
            	 */
                return $q.when(_promises[key]); 
            } else {
            	/*
            	* Se il parametro refresh e' 'true' o il dato non e' presente, viene eseguita la chiamata Ajax
                */
                return _ajaxRequest("GET", URL, data, _genericCallback, key);
            }
        };

        /*
         * Funzione privata per effettuare le chiamate Ajax.
         * Questa funzione ritorna sempre un oggetto di tipo promise.
         * Una volta che la chiamata Ajax asincrona e' terminata, la promise:
         * - in caso di successo, viene 'risolta' e riempita con i dati 'tornati' dal server (deferred.resolve(data));
         * - in caso di errore, viene 'rifiutata' e riempita con la causa del fallimento (deferred.reject(data)).
         */
        var _ajaxRequest = function(method, URL, data, callback, key) {
            var deferred = $q.defer();
            $http({
            	method: method,
            	/*
            	 * Aggiungo alla URL il timestamp per evitare la cache
            	 */
            	url: URL + '?v=' + new Date().getTime(),
            	data: data,
            	/*
            	 * Headers di sicurezza
            	 */
            	headers: {
					"X-Content-Type-Options": "nosniff",
					"X-XSS-Protection": "1; mode=block",
					"X-Frame-Options": "deny",
					"Strict-Transport-Security": "max-age=16070400; includeSubDomains",
					"cfUtente": $rootScope.utente.codFiscale
				}
            }).success(function(data) {
            	deferred.resolve(data);
                if (callback) {                	
                	callback(key, data);                    
                }
            }).error(function(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };

        /*
         * Metodi pubblici esposti dal Service
         */
        
        this.getElencoCriteri = function() {        	
        	return _promisesGetter(CONSTANTS.JSON + "/istanze.json", null, "elencoCriteri", false);
        };
        
        //Fornitori 

        this.elencoFornitori = function(data) {
        	$log.debug(data);
        	return _ajaxRequest("POST", CONSTANTS.FORNITORI + CONSTANTS.ELENCO, data);
        };
        
        this.getDettaglioFornitore = function(id) {
        	$log.debug(id);
        	return _promisesGetter(CONSTANTS.FORNITORI + id, null, "dettaglio" + id, false);
        };

        this.insFornitore = function(data) {
        	$log.debug(data);
        	return _ajaxRequest("POST", CONSTANTS.FORNITORI, data);
        };
        
        this.updFornitore = function(data) {
        	$log.debug(data);
        	return _ajaxRequest("PUT", CONSTANTS.FORNITORI + data.id,
							data);
        };

        //Tipo categoria 
        
        this.elencoTipoCategoria = function(data) {
        	$log.debug(data);
        	return _ajaxRequest("POST", CONSTANTS.TIPO_CATEGORIA + CONSTANTS.ELENCO, data);
        };
        
        this.insCategoria = function(data) {
        	$log.debug(data);
        	return _ajaxRequest("POST", CONSTANTS.TIPO_CATEGORIA, data);
        };
        
//        this.removeSmartphone = function(id) {
//        	$log.debug(id);
//        	return _ajaxRequest("DELETE", CONSTANTS.SMARTPHONE + id, null);
//        };

        //Criticit�
        this.insCriticita = function(data) {
        	$log.debug(data);
        	return _ajaxRequest("POST", CONSTANTS.CRITICITA, data);
        };
               
        this.getElencoRegioni = function() {        	
        	return _promisesGetter(CONSTANTS.CRITICITA + "/elencoRegioni", null, "elencoRegioni", false);
        };
        
        this.getElencoProvince = function(codiceRegione) {
        	$log.debug(codiceRegione);
        	return _promisesGetter(CONSTANTS.CRITICITA + "/elencoProvince/" + codiceRegione, null, "elencoProvince" + codiceRegione, false);
        };

        this.getUserInfo = function() {
        	return _promisesGetter(CONSTANTS.USER_INFO, null, "userInfo", false);
        };

        this.logout = function() {
        	return _ajaxRequest("GET", CONSTANTS.LOGOUT, null);
        };
    }

	/*
	 * Service che prende come input un array di promise e ne restituisce i risultati
	 */
	function Resolver($q) {
        return function(promises) {
            return $q.all(promises);
        };
    }

	return resourceServices;	
});