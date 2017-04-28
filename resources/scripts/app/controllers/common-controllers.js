/*
 * File per la definizione dei Controller Angular:
 * https://code.angularjs.org/1.4.3/docs/guide/controller
 */
define([
	'angular'
],
function(angular) {

	var commonControllers = angular.module('commonControllers', ['configModule']);

	/*
	 * Le dipendenze dei Controller sono definite come stringhe per evitare problemi in caso di minificazione dei file .js
	 * https://code.angularjs.org/1.4.3/docs/tutorial/step_05
	 */
	commonControllers.controller('BreadcrumbCtrl', ['$scope', '$rootScope', 'CONSTANTS', BreadcrumbCtrl]);
	commonControllers.controller('MenuCtrl', ['$scope', '$rootScope', 'CONSTANTS', MenuCtrl]);
	commonControllers.controller('UserCtrl', ['$log', '$scope', '$rootScope', '$window', 'ResourceService', 'CONSTANTS', UserCtrl]);
	commonControllers.controller('MessageCtrl', ['$scope', '$window', 'MessageService', MessageCtrl]);

	function BreadcrumbCtrl($scope, $rootScope, CONSTANTS) {

	};

	function MenuCtrl($scope, $rootScope, CONSTANTS) {

		$scope.listaBreadCrumb = [];
		$scope.CONSTANTS = CONSTANTS;
		console.log($scope.CONSTANTS);

	};

	/*
     * Definisco il Controller Menu
     */
	function UserCtrl($log, $scope, $rootScope, $window, ResourceService, CONSTANTS) {
		var vm = this;

//		var datiUtente = new Object();
//		var encoded64 = window.location.hash.replace("#/?","");
//		var parameters = atob(encoded64).split("&");
//		for (i = 0; i < parameters.length; i++) {
//			var params = parameters[i].split("=");
//			var paramName = decodeURIComponent(params[0]);
//			var paramValue = decodeURIComponent(params[1]);
//
//			datiUtente[paramName] = paramValue;
//
//		}
//		console.log(datiUtente.user);

		$scope.titolo = 'AAMS';

		$rootScope.utente = {};
		$rootScope.utente.nome = 'Mario';
		$rootScope.utente.cognome = 'Rossi';
		$rootScope.utente.denominazione = $rootScope.utente.nome + ' ' +$rootScope.utente.cognome;
		$rootScope.utente.codFiscale = 'SOGEI';
		$rootScope.utente.codUfficio = 'L7A';
		$rootScope.utente.descUfficio = 'Direzione Centrale';
		console.log($rootScope.utente);

		$scope.listaMenu = [];
		$scope.listaMenu[0] = {};
		$scope.listaMenu[0].link = '/ciao';
		$scope.listaMenu[0].desc = 'Istanze';
		$scope.listaMenu[0].class = 'active';
		$scope.listaMenu[0].dropdown = [];
		$scope.listaMenu[0].dropdown[0] = {};
		$scope.listaMenu[0].dropdown[0].link = CONSTANTS.INS_CRITERIO_PAGE;
		$scope.listaMenu[0].dropdown[0].desc = 'Inserimento stanza';
		$scope.listaMenu[0].dropdown[1] = {};
		$scope.listaMenu[0].dropdown[1].link = CONSTANTS.ELENCO_CRITERI_PAGE;
		$scope.listaMenu[0].dropdown[1].desc = 'Elenco stanze';
		$scope.listaMenu[1] = {};
		$scope.listaMenu[1].link = CONSTANTS.VIDEO_PAGE;
		$scope.listaMenu[1].desc = 'Test video';

		$scope.listaBreadCrumb = [];


		$rootScope.pushStackElement = function (link,desc, eraseStack){
			console.log("push");
			if(eraseStack){
				$scope.listaBreadCrumb =[];
			}
			$scope.elemBC = {};
			$scope.elemBC.desc = desc;
			$scope.elemBC.link = link;
			if(desc!=''){
				$scope.listaBreadCrumb.push($scope.elemBC);
			}
		};

		/*
		 * Richiamo una funzione fittizia di logout, che rimanda sulla pagina di login,
		 * da commentare se i servizi sono messi in sicurezza
		 */
        vm.logout = function() {
        	$log.debug("Logout");
        	$window.location.href = CONSTANTS.LOGIN_PAGE;
        };
		/*
		 * Richiamo la funzione reale di logout, che dovra' invalidare la sessione,
		 * commentata per testare i servizi non in sicurezza
		 */
//        vm.logout = function() {
//        	$log.debug("Logout");
//        	ResourceService.logout().then(function() {
//        		$window.location.href = CONSTANTS.HOME_PAGE;
//            },function(error) {
//	        	$log.error(error);
//	        });
//        };
        /*
		 * Richiamo il servizio che restituisce le informazioni utente
		 * per visualizzare il nome nella barra di menu,
		 * commentato per testare i servizi non in sicurezza
		 */
//		ResourceService.getUserInfo().then(function(response) {
//			vm.userName = response.userName;
//	    },function(error) {
//	    	$log.error(error);
//	    });
	}

	/*
     * Definisco il Controller Messagge
     */
	function MessageCtrl($scope, $window, MessageService) {
		var vm = this;
		/*
		 * Intercetto l'evento che notifica l'aggiornamento dei messaggi.
		 * L'evento viene emesso dal MessageService
		 */
		$scope.$on("messagesUpdate", function(event) {
			vm.messages = MessageService.getAllMessages();
			/*
			 * Riporto lo scroll della pagina in alto per visualizzare il messaggio
			 */
			$window.scrollTo(0, 0);
		});
	}

	return commonControllers;
});
