/*
 * File per la definizione dei Controller Angular:
 * https://code.angularjs.org/1.4.3/docs/guide/controller
 */
define([
	'angular'
],
function(angular) {

	var testControllers = angular.module('testControllers', ['configModule']);

	/*
	 * Le dipendenze dei Controller sono definite come stringhe per evitare problemi in caso di minificazione dei file .js
	 * https://code.angularjs.org/1.4.3/docs/tutorial/step_05
	 */
	testControllers.controller('TestCtrl', ['$log', TestCtrl]);

    /* 
     * Definisco il Controller Test per eseguire gli unit test.
     * Leggere il README.txt per la configurazione dell'ambiente di test
     */
	function TestCtrl($log) {		
		var vm = this;       
		vm.user = "";			
    }
	
	TestCtrl.prototype.printHello = function() {
		var vm = this;
		return "Hello World "+ vm.user;
	};

	return testControllers;
});