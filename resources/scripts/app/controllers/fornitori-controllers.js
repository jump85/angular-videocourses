/*
 * File per la definizione dei Controller Angular:
 * https://code.angularjs.org/1.4.3/docs/guide/controller
 */
define([
	'angular'
],
function(angular) {

	var fornitoriControllers = angular.module('fornitoriControllers', ['configModule']);

	/*
	 * Le dipendenze dei Controller sono definite come stringhe per evitare problemi in caso di minificazione dei file .js
	 * https://code.angularjs.org/1.4.3/docs/tutorial/step_05
	 */
	fornitoriControllers.controller('CercaFornitoriCtrl', ['$log', '$scope', '$rootScope', 'ResourceService', 'MessageService', 'CONSTANTS', CercaFornitoriCtrl]);
	fornitoriControllers.controller('InsFornitoreCtrl', ['$log', '$scope', 'ResourceService', 'MessageService','CONSTANTS', InsFornitoreCtrl]);
	fornitoriControllers.controller('UpdFornitoreCtrl', ['$log', '$scope', '$routeParams', 'ResourceService', 'MessageService', 'CONSTANTS', UpdFornitoreCtrl]);
	fornitoriControllers.controller('DettFornitoreCtrl', ['$log', '$scope', '$routeParams', 'ResourceService', 'CONSTANTS', DettFornitoreCtrl]);

	
	function CercaFornitoriCtrl($log, $scope, $rootScope, ResourceService, MessageService,CONSTANTS) {
		
		var vm = this;
		$scope.formContent = {};
		$scope.CONSTANTS = CONSTANTS;
		$scope.titolo = 'RICERCA FORNITORI';
//		$scope.submitLabel = 'Cerca';
		
		$scope.rowsPerPage = 10;
		$scope.isLoading = true;
		
		$scope.cerca = function(form){
			console.log($scope.formContent);
			MessageService.clearMessages();
			if(form.$valid){
				$scope.isLoading = true;
    			ResourceService.elencoFornitori($scope.formContent).then(function(response) {
    				console.log(response);
    				$scope.rowsFornitori = response;
    				$scope.numFornitori = $scope.rowsFornitori.length;
    				if($scope.numFornitori !=0){
    					$scope.isLoading = false;
    				}else{
    					MessageService.addWarningMessages([CONSTANTS.NORESULTMSG]);
    	        		MessageService.showMessages();
    				}
    					
    			},function(error) {
    				console.error(error);
    			});
			}else{
				MessageService.addLabelsToError(form);
        		MessageService.showMessages();
			}

		};

	}
	
	function InsFornitoreCtrl($log, $scope, ResourceService, MessageService, CONSTANTS) {
		
		var vm = this;
		$scope.formContent = {};
		$scope.titolo = 'INSERIMENTO NUOVO FORNITORE';
		$scope.submitLabel = 'Inserisci';
		
		$scope.salva = function(form){
			console.log($scope.formContent);
			MessageService.clearMessages();
			if(form.$valid){
    			ResourceService.insFornitore($scope.formContent).then(function(response) {
    				console.log(response);
    				$scope.formContent = {};
    				form.$submitted = false;
    				MessageService.addSuccessMessages([CONSTANTS.INSSUCCESSMSG]);
	        		MessageService.showMessages();
    			},function(error) {
    				console.error(error);
    			});
			}else{
				MessageService.addLabelsToError(form);
        		MessageService.showMessages();
			}

		};

	}
	
	function UpdFornitoreCtrl($log, $scope, $routeParams, ResourceService, MessageService, CONSTANTS) {
		
		var vm = this;
		var id = $routeParams.id;
		$scope.formContent = {};
		$scope.titolo = 'AGGIORNA FORNITORE';
		$scope.submitLabel = 'Aggiorna';
		
		//Carico i dati relativi al fornitore da aggiornare
		ResourceService.getDettaglioFornitore(id).then(function(response) {
       		$scope.formContent = response;
       		$log.debug($scope.formContent);
       	});
		
		$scope.salva = function(form){
			console.log($scope.formContent);
			MessageService.clearMessages();
			if(form.$valid){
				ResourceService.updFornitore($scope.formContent).then(function(response) {
					console.log(response);
//					$scope.formContent = {};
    				form.$submitted = false;
    				MessageService.addSuccessMessages([CONSTANTS.UPDSUCCESSMSG]);
	        		MessageService.showMessages();
				},function(error) {
					console.error(error);
				});
			}else{
				MessageService.addLabelsToError(form);
        		MessageService.showMessages();
			}
		};

	}
	
	function DettFornitoreCtrl($log, $scope, $routeParams, ResourceService, CONSTANTS) {
		
		var vm = this;
		var id = $routeParams.id;
		$scope.formContent = {};
		$scope.titolo = 'DETTAGLIO FORNITORE';
		
		//Carico i dati relativi al fornitore da aggiornare
		ResourceService.getDettaglioFornitore(id).then(function(response) {
       		$scope.formContent = response;
       		$log.debug($scope.formContent);
       	});

	}

	return fornitoriControllers;
});