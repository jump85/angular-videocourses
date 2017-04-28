/*
 * File per la definizione dei Controller Angular:
 * https://code.angularjs.org/1.4.3/docs/guide/controller
 */
define([
	'angular'
],
function(angular) {

	var criticitaControllers = angular.module('criticitaControllers', ['configModule']);

	/*
	 * Le dipendenze dei Controller sono definite come stringhe per evitare problemi in caso di minificazione dei file .js
	 * https://code.angularjs.org/1.4.3/docs/tutorial/step_05
	 */
//	criticitaControllers.controller('CercaCriticitaCtrl', ['$log', '$scope', '$rootScope', 'ResourceService', 'MessageService', 'CONSTANTS', CercaCriticitaCtrl]);
	criticitaControllers.controller('InsCriticitaCtrl', ['$log', '$scope', 'dateFilter', 'uiUploader', 'ResourceService', 'MessageService','CONSTANTS', InsCriticitaCtrl]);
//	criticitaControllers.controller('UpdCriticitaCtrl', ['$log', '$scope', '$routeParams', 'ResourceService', 'MessageService', 'CONSTANTS', UpdCriticitaCtrl]);
//	criticitaControllers.controller('DettCriticitaCtrl', ['$log', '$scope', '$routeParams', 'ResourceService', 'CONSTANTS', DettCriticitaCtrl]);

	
//	function CercaCriticitaCtrl($log, $scope, $rootScope, ResourceService, MessageService,CONSTANTS) {
//		
//		var vm = this;
//		$scope.formContent = {};
//		$scope.CONSTANTS = CONSTANTS;
//		$scope.titolo = 'RICERCA FORNITORI';
////		$scope.submitLabel = 'Cerca';
//		
//		$scope.rowsPerPage = 10;
//		$scope.isLoading = true;
//		
//		$scope.cerca = function(form){
//			console.log($scope.formContent);
//			MessageService.clearMessages();
//			if(form.$valid){
//				$scope.isLoading = true;
//    			ResourceService.elencoCriticita($scope.formContent).then(function(response) {
//    				console.log(response);
//    				$scope.rowsCriticita = response;
//    				$scope.numCriticita = $scope.rowsCriticita.length;
//    				if($scope.numCriticita !=0){
//    					$scope.isLoading = false;
//    				}else{
//    					MessageService.addWarningMessages([CONSTANTS.NORESULTMSG]);
//    	        		MessageService.showMessages();
//    				}
//    					
//    			},function(error) {
//    				console.error(error);
//    			});
//			}else{
//				MessageService.addLabelsToError(form);
//        		MessageService.showMessages();
//			}
//
//		};
//
//	}
	
	function InsCriticitaCtrl($log, $scope, dateFilter, uiUploader, ResourceService, MessageService, CONSTANTS) {
		
		var vm = this;


		//Azioni associate all upload dei documenti
		$scope.btnRemove = function(file) {
			$log.info('deleting=' + file);
			uiUploader.removeFile(file);
		};
		$scope.btnClean = function() {
			uiUploader.removeAll();
			$log.info('tutti rimossi...');
		};
		$scope.btnUpload = function(id) {
			$log.info('uploading...');
			uiUploader.startUpload({
				url: '/MonitoraggioCriticitaRestService/jaxrs/criticita/upload/'+id,
				concurrency: 2,
				onProgress: function(file) {
				$log.info(file.name + '=' + file.humanSize);
				$scope.$apply();
			},
			onCompleted: function(file, response) {
				$log.info(file + 'response' + response);
			}
			});
		};
		$scope.files = [];
		var element = document.getElementById('file1');
		element.addEventListener('change', function(e) {
			var files = e.target.files;
			uiUploader.addFiles(files);
			$scope.files = uiUploader.getFiles();
			$scope.$apply();
		});
		
		//funzione reset campi form
		$scope.initFormContent = function(){
			$scope.formContent = {};
			$scope.formContent.categoria = null;
			$scope.formContent.descrizioneMacro = null;
			$scope.formContent.descrizioneMicro = null;
			$scope.regione = null;
			$scope.provincia = null;
			$scope.dataEvento = new Date();
			$scope.btnClean();
		}
		
		$scope.initFormContent();
		$scope.titolo = 'INSERIMENTO NUOVA CRITICITA\'';
		
		$scope.salva = function(form){
			console.log($scope.formContent);
			MessageService.clearMessages();
			if(form.$valid){
				if($scope.regione){
					$scope.formContent.codiceRegione = $scope.regione.id;
					$scope.formContent.nomeRegione = $scope.regione.descrizione;
				}
				if($scope.provincia){
					$scope.formContent.siglaProvincia = $scope.provincia.id;
					$scope.formContent.nomeProvincia = $scope.provincia.descrizione;
				}
				if($scope.fornitoreSelezionato)
					$scope.formContent.idFornitore = $scope.formContent.fornitoreSelezionato.id;
    			
				ResourceService.insCriticita($scope.formContent).then(function(response) {
    				console.log(response);
	        		$scope.btnUpload('21');
					MessageService.addSuccessMessages([CONSTANTS.INSSUCCESSMSG]);
	        		MessageService.showMessages();
					$scope.initFormContent();
					form.$submitted = false;
    			},function(error) {
    				MessageService.addErrorMessages(['Errore']);
	        		MessageService.showMessages();
    				console.error(error);
    			});
			}else{
				MessageService.addLabelsToError(form);
        		MessageService.showMessages();
			}

		};

		
		//funzione che popola la combo dei fornitori
		$scope.caricaListaFornitori = function() {
			
			//form vuoto
			$scope.formFornitori = {};
			
			ResourceService.elencoFornitori($scope.formFornitori).then(function(response) {
				console.log(response);
				$scope.listaFornitori = response;					
			},function(error) {
				MessageService.addErrorMessages(['Errore']);
        		MessageService.showMessages();
//				console.error(error);
			});		
		};
		
		//funzione che popola la combo dei fornitori
		$scope.caricaListaCategorie = function() {
			
			//form vuoto
			$scope.formCategorie = {};
		
			ResourceService.elencoTipoCategoria($scope.formCategorie).then(function(response) {
				console.log(response);
				$scope.listaCategorie = response;
			
			},function(error) {
				MessageService.addWarningMessages([CONSTANTS.NORESULTMSG]);
				MessageService.showMessages();
			});
		
		}
		

		//funzione che popola la combo delle regioni
		$scope.caricalistaRegioni = function() {						
			ResourceService.getElencoRegioni().then(function(response) {
				console.log(response);
				$scope.elencoRegioni = response;					
			},function(error) {
				MessageService.addErrorMessages(['Errore']);
        		MessageService.showMessages();
				console.error(error);
			});		
		};
		
		//funzione che popola la combo delle province
		$scope.caricalistaProvince = function(codiceRegione) {						
			ResourceService.getElencoProvince(codiceRegione).then(function(response) {
				console.log(response);
				$scope.elencoProvince = response;					
			},function(error) {
				MessageService.addErrorMessages(['Errore']);
        		MessageService.showMessages();
				console.error(error);
			});		
		};
		
		//quando cambio la regione popolo dinamicamente la combo provincia a seconda della selezione
		$scope.$watch("regione", function(newValue, oldValue) {
			 
		    if (newValue != oldValue){
		    	console.log(newValue);
		    	$scope.caricalistaProvince(newValue.id);
		    }
		        
		    
		},true);
		
		$scope.caricaListaFornitori();
		$scope.caricaListaCategorie();
		$scope.caricalistaRegioni();
		

		//Impostazioni per calendario Data evento		
		$scope.inlineOptions = {
				customClass: getDayClass,
				minDate: new Date(),
				showWeeks: true
		};

		$scope.dateOptions = {
				dateDisabled: disabled,
				formatYear: 'yy',
				maxDate: new Date(2020, 5, 22),
				minDate: new Date(1978, 1, 1),
				startingDay: 1
		};

		// Disable weekend selection
		function disabled(data) {
			var date = data.date,
			mode = data.mode;
			return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
		}

		$scope.toggleMin = function() {
			$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
			$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
		};

		$scope.toggleMin();

		$scope.open = function() {
			$scope.popup.opened = true;
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','dd/MM/yyyy'];
		$scope.format = $scope.formats[4];
		$scope.altInputFormats = ['d!/M!/yyyy'];

		$scope.popup = {
				opened: false
		};

		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		var afterTomorrow = new Date();
		afterTomorrow.setDate(tomorrow.getDate() + 1);
		$scope.events = [
		                 {
		                	 date: tomorrow,
		                	 status: 'full'
		                 },
		                 {
		                	 date: afterTomorrow,
		                	 status: 'partially'
		                 }
		                 ];

		function getDayClass(data) {
			var date = data.date,
			mode = data.mode;
			if (mode === 'day') {
				var dayToCheck = new Date(date).setHours(0,0,0,0);

				for (var i = 0; i < $scope.events.length; i++) {
					var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

					if (dayToCheck === currentDay) {
						return $scope.events[i].status;
					}
				}
			}

			return '';
		}

	}	


//	function UpdCriticitaCtrl($log, $scope, $routeParams, ResourceService, MessageService, CONSTANTS) {
//		
//		var vm = this;
//		var id = $routeParams.id;
//		$scope.formContent = {};
//		$scope.titolo = 'AGGIORNA FORNITORE';
//		$scope.submitLabel = 'Aggiorna';
//		
//		//Carico i dati relativi al fornitore da aggiornare
//		ResourceService.getDettaglioCriticita(id).then(function(response) {
//       		$scope.formContent = response;
//       		$log.debug($scope.formContent);
//       	});
//		
//		$scope.salva = function(form){
//			console.log($scope.formContent);
//			MessageService.clearMessages();
//			if(form.$valid){
//				ResourceService.updCriticita($scope.formContent).then(function(response) {
//					console.log(response);
////					$scope.formContent = {};
//    				form.$submitted = false;
//    				MessageService.addSuccessMessages([CONSTANTS.UPDSUCCESSMSG]);
//	        		MessageService.showMessages();
//				},function(error) {
//					console.error(error);
//				});
//			}else{
//				MessageService.addLabelsToError(form);
//        		MessageService.showMessages();
//			}
//		};
//
//	}
//	
//	function DettCriticitaCtrl($log, $scope, $routeParams, ResourceService, CONSTANTS) {
//		
//		var vm = this;
//		var id = $routeParams.id;
//		$scope.formContent = {};
//		$scope.titolo = 'DETTAGLIO FORNITORE';
//		
//		//Carico i dati relativi alla criticità da aggiornare
//		ResourceService.getDettaglioCriticita(id).then(function(response) {
//       		$scope.formContent = response;
//       		$log.debug($scope.formContent);
//       	});
//
//	}

	return criticitaControllers;
});