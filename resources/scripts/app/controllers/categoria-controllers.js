/*
 * File per la definizione dei Controller Angular:
 * https://code.angularjs.org/1.4.3/docs/guide/controller
 */
define([
	'angular'
],
function(angular) {

	var tipoCategoriaControllers = angular.module('tipoCategoriaControllers', ['configModule']);

	/*
	 * Le dipendenze dei Controller sono definite come stringhe per evitare problemi in caso di minificazione dei file .js
	 * https://code.angularjs.org/1.4.3/docs/tutorial/step_05
	 */
	tipoCategoriaControllers.controller('CercaCategoriaCtrl', ['$log', '$scope', '$rootScope', 'ResourceService', 'MessageService','CONSTANTS', CercaCategoriaCtrl]);
	tipoCategoriaControllers.controller('InsCategoriaCtrl', ['$log', '$scope', 'ResourceService', 'MessageService', 'CONSTANTS', InsCategoriaCtrl]);
//	tipoCategoriaControllers.controller('UpdCategoriaCtrl', ['$log', '$scope', '$routeParams', 'ResourceService','CONSTANTS', UpdCategoriaCtrl]);


	function CercaCategoriaCtrl($log, $scope, $rootScope, ResourceService, MessageService, CONSTANTS) {
		
		var vm = this;
		$scope.formContent = {};
//		$scope.CONSTANTS = CONSTANTS;
		$scope.titolo = 'RICERCA TIPO CATEGORIA';
//		$scope.submitLabel = 'Cerca';
		
		$scope.rowsPerPage = 10;
		$scope.isLoading = true;
		
		$scope.cerca = function(form){
			console.log($scope.formContent);
			MessageService.clearMessages();
			if(form.$valid){
				$scope.isLoading = true;
				ResourceService.elencoTipoCategoria($scope.formContent).then(function(response) {
					console.log(response);
					$scope.rowsTipoCategoria = response;
					$scope.numTipoCategoria = $scope.rowsTipoCategoria.length;
    				if($scope.numTipoCategoria !=0){
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
	
	function InsCategoriaCtrl($log, $scope, ResourceService, MessageService, CONSTANTS) {
		
		var vm = this;
		$scope.formContent = {};
		$scope.titolo = 'INSERIMENTO NUOVA CATEGORIA';
		
		$scope.salva = function(form){
			console.log($scope.formContent);
			MessageService.clearMessages();
			if(form.$valid){
				ResourceService.insCategoria($scope.formContent).then(function(response) {
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
	
//	function UpdCategoriaCtrl($log, $scope, $routeParams, ResourceService, CONSTANTS) {
//		
//		var vm = this;
//		var id = $routeParams.id;
//		$scope.formContent = {};
//		$scope.titolo = 'AGGIORNA FORNITORE';
//		
//		//Carico i dati relativi al fornitore da aggiornare
//		ResourceService.getDettaglioFornitore(id).then(function(response) {
//       		$scope.formContent = response;
//       		$log.debug($scope.formContent);
//       	});
//		
//		$scope.salvaFornitore = function(){
//			console.log($scope.formContent);
//			ResourceService.updFornitore($scope.formContent).then(function(response) {
//				console.log(response);
//			},function(error) {
//				console.error(error);
//			});
//		};
//
//	}



	return tipoCategoriaControllers;
});