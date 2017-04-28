/*
 * File per la definizione dei Controller Angular:
 * https://code.angularjs.org/1.4.3/docs/guide/controller
 */
define([
	'angular'
],
function(angular) {

	var criterioControllers = angular.module('criterioControllers', ['configModule']);

	/*
	 * Le dipendenze dei Controller sono definite come stringhe per evitare problemi in caso di minificazione dei file .js
	 * https://code.angularjs.org/1.4.3/docs/tutorial/step_05
	 */
//	criterioControllers.controller('CercaCriticitaCtrl', ['$log', '$scope', '$rootScope', 'ResourceService', 'MessageService', 'CONSTANTS', CercaCriticitaCtrl]);
	criterioControllers.controller('InsCriterioCtrl', ['$scope', '$location', '$timeout','uiUploader', 'ngProgressLite','ResourceService','$log', InsCriterioCtrl]);
	criterioControllers.controller('ElencoCriteriCtrl', ['$scope', '$rootScope', '$timeout','ngProgressLite','filterFilter', 'ResourceService', 'CONSTANTS', ElencoCriteriCtrl]);
//	criterioControllers.controller('DettCriticitaCtrl', ['$log', '$scope', '$routeParams', 'ResourceService', 'CONSTANTS', DettCriticitaCtrl]);

	function InsCriterioCtrl($scope, $location, $timeout,uiUploader, ngProgressLite, ResourceService, $log) {

		$scope.mostraConferma = false;
		calendario($scope);
		$scope.formContent = {};
				
		$scope.submit = function submit(contentPage, valid){
		
			if(valid){
				
				ngProgressLite.start();	
				ngProgressLite.inc();
				ngProgressLite.set(0.2)
				ngProgressLite.inc();
				ngProgressLite.set(0.5)
				
				$timeout(function () {
//					alert('Inserimento avvenuto con successo');
					$('#inserimentoModal').modal('show');
					ngProgressLite.done();
					
//					var row;
//					$scope.dettaglioCriterio(row); 
					
				}, 1500);				
				
				
				if($scope.idSelected == null){					

				}else{

				}
			}
		};
	
		 $scope.changeView = function(view){
				$('#inserimentoModal').modal('hide');
	            
				$timeout(function () {
				$location.path(view); // path not hash
				}, 500);
	        }
		
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
		
		ResourceService.getElencoCriteri().then(function(data) {
			console.log(data);
			$scope.listaCombo = data.istanze;
		},
		
		function(data){
			$('#erroreServerModal').modal('show');
		});
		
		$scope.dettaglioCriterio = function (row){
			$scope.row = row;
			ngProgressLite.start();
			$timeout(function () {
				ngProgressLite.inc();
				ngProgressLite.set(0.2);
				ngProgressLite.inc();
				ngProgressLite.set(0.8);					
				$('#dettaglioModal').modal('show');
				ngProgressLite.done();
			},1000);
		}
		
		//funzione reset campi form
		$scope.initFormContent = function(){
			$scope.formContent = {};
			$scope.btnClean();		
		}
	}

	//---- SEZIONE CRITERI ----
	function ElencoCriteriCtrl($scope, $rootScope, $timeout, ngProgressLite, filterFilter, ResourceService, CONSTANTS) {
		
		$scope.CONSTANTS = CONSTANTS;
		calendario($scope);
		$scope.formContent = {};
		
		 $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
		    $scope.data = [300, 500, 100, 40, 120];
		    $scope.type = 'PolarArea';

		    $scope.toggle = function () {
		      $scope.type = $scope.type === 'PolarArea' ?
		        'Pie' : 'PolarArea';
		    };

		$scope.changeTab = function (content, tabActive){
//			$timeout(function() {
				$scope.tabContent = content;
				$scope.tabActive = tabActive;
				if(tabActive == 1){
					$scope.isLoading = true;
					$scope.flagTab = false;
				}
				else if(tabActive == 2){
					$scope.isLoading = false;
					$scope.flagTab = true;
				}
//		    }, 500);

		};
		
		$scope.formContent = {};
		$scope.rowsPerPage = 10;
		
		// metodo per gestire la paginazione della tabella criteri
		$scope.getElencoCriteri = function(form){
			$scope.rowsPerPage = 10;
			if(form.$valid){
				
				ngProgressLite.start();
				$timeout(function () {
					ngProgressLite.inc();
					ngProgressLite.set(0.2);
					ngProgressLite.inc();
					ngProgressLite.set(0.3);
					ngProgressLite.inc();
				}, 500);
				 
				$timeout(function () {				
				ResourceService.getElencoCriteri().then(function(data) {
					$scope.rowsIstanze = filterFilter(data.istanze, {tipoistanza: $scope.formContent.codTipoIstanza, desstatoistanza: $scope.formContent.codStatoIstanza, codconc: $scope.formContent.codConcessione ? $scope.formContent.codConcessione[0]:''});
//					$scope.rowsIstanze = data.istanze;
					$scope.isLoading = false;
					
					ngProgressLite.set(0.5);
					ngProgressLite.inc();
					ngProgressLite.set(0.8);					
					ngProgressLite.done();
					
					//Parametri di paginazione
					$scope.numCriteri = $scope.rowsIstanze.length;
					$scope.changeTab('views/partials/tabElencoCriteri.html', 2);
					form.$submitted = false;
//					$scope.flagTab = true;
					//$scope.pages = Math.ceil (data.numRows / $scope.rowsPerPage); 
//					tableState.pagination.numberOfPages = $scope.pages;
//					tableState.pagination.totalItemCount = data.numRows;
				},
				function(data){
					$('#erroreServerModal').modal('show');
				});
				}, 1000);
			}
		};
		
		ResourceService.getElencoCriteri().then(function(data) {
			console.log(data);
			$scope.listaCombo = data.istanze;
			$scope.listaCombo.push({
			      "idprotaams": "",
			      "destipoistanza": "",
			      "desstatoistanza": "",
			      "codconc": "",
			      "denomconc": "",
			      "tipogioco": "",
			      "codpiatt": "",
			      "codgioco": "",
			      "descazione": "",
			      "dttrasmissione": "",
			      
			      "tipoistanza": "",
			      "tiporichiesta": "",
			      "statusistanza": "",
			      "dtultimoagg": "",
			      "dtprotnsd": "",
			      
			      "codmotivazione": "",
			      "dtultimaelab": "",
			      
			      "tipoelabdati": "",
			      "descelabdati": ""
			    });
		},
		function(data){
			

				$('#erroreServerModal').modal('show');

		});
		
		
		//quando cambio la regione popolo dinamicamente la combo provincia a seconda della selezione
		$scope.$watch("formContent", function(newValue, oldValue) {
			
//			if (newValue != oldValue){
				console.log(newValue.codTipoIstanza);
				
					ResourceService.getElencoCriteri().then(function(data) {
						$scope.rowsIstanze = filterFilter(data.istanze, {tipoistanza: newValue.codTipoIstanza, desstatoistanza: newValue.codStatoIstanza, codconc: newValue.codConcessione ? newValue.codConcessione[0] : ''});
						$scope.formContent.numRisultati = $scope.rowsIstanze.length;
						console.log($scope.rowsIstanze);
					});				
					
				
//			}
		    
		},true);
		
		$scope.modificaCriterio = function modificaCriterio(contentPage, idSelected){
			$rootScope.changeContent(contentPage, MOD_CRITERIO_TITLE, false, true);
		};
		
		$scope.dettaglioCriterio = function (row){
			$scope.row = row;
			ngProgressLite.start();
			$timeout(function () {
				ngProgressLite.inc();
				ngProgressLite.set(0.2);
				ngProgressLite.inc();
				ngProgressLite.set(0.8);					
				$('#dettaglioModal').modal('show');
				ngProgressLite.done();
			},1000);
		}
		
		$scope.eliminaCriterio = function eliminaCriterio(idSelected){
			$scope.idElimina = idSelected;
			$('#eliminaModal').modal('show');
		};

		$scope.eliminaConferma = function eliminaConferma(){
			$('#eliminaModal').modal('hide');
//			query = criteriFactory.eliminaCriterio($scope.idElimina);
//			query.$promise.then(
//	            function(response){
//	    			alert("Cancellazione avvenuta con successo");
//	    			$scope.idElimina = null;
//	    			$scope.getElencoCriteri($scope.tableState);
//	            },
//	            function(response) {
//	    			$('#erroreServerModal').modal('show');
//	            }		
//			);
		};
	}
	
	function calendario($scope){
		
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

		$scope.open1 = function() {
			$scope.popupDal.opened = true;

		};
		$scope.open2 = function() {
			$scope.popupAl.opened = true;

		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','dd/MM/yyyy'];
		$scope.format = $scope.formats[4];
		$scope.altInputFormats = ['d!/M!/yyyy'];

		$scope.popupDal = {
				opened: false
		};
		
		$scope.popupAl = {
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

	return criterioControllers;
});