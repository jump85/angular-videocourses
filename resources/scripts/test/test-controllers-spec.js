define([
    'angular',
    'angularMock',
    'app'
], function(angular, app) {
	
	/*
	 * Sintassi autodescrittiva di un test per il Controller Test
	 */
	describe('TestCtrl', function() {
		/*
		 * Prima di eseguire il passo successivo, inietto l'applicazione
		 */
		beforeEach(module('NomeApp'));

		var $controller;

		/*
		 * Prima di eseguire il passo successivo, inietto i Controller dell'applicazione
		 */
		beforeEach(inject(function(_$controller_){
          $controller = _$controller_; // The injector unwraps the underscores (_) from around the parameter names when matching
		}));

		describe('firstTest', function() {
			var $scope, $log, controller;

			/*
			 * Prima di eseguire il passo successivo, inietto il Controller Test
			 */
			beforeEach(function() {
              $scope = {};
              controller = $controller('TestCtrl', { $scope: $scope, $log: $log });
			});

			/*
			 * Eseguo il test printHello.
			 * Inietto il nome 'Steve' nello scope del Controller Test e verifico che il metodo restituisca la stringa 'Hello World Steve'
			 */
			it('printHello', function() {
              controller.user = 'Steve';
              expect(controller.printHello()).toEqual('Hello World Steve');
			});
		});
	});
});