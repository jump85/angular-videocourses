/*
 * File per la definizione dei Controller Angular:
 * https://code.angularjs.org/1.4.3/docs/guide/controller
 */
define([
	'angular'
],
function(angular) {

	var homeControllers = angular.module('homeControllers', []);

	/*
	 * Le dipendenze dei Controller sono definite come stringhe per evitare problemi in caso di minificazione dei file .js
	 * https://code.angularjs.org/1.4.3/docs/tutorial/step_05
	 */
	homeControllers.controller('HomeCtrl', [HomeCtrl]);
	homeControllers.controller('HomeChildCtrl', [HomeChildCtrl]);

	/* 
     * Definisco il Controller Home
     */
	function HomeCtrl() {
//		var vm = this;
//        vm.user = data[0];
	}

	/*
	 *  Aggiungo il metodo getHello al Controller utilizzando il suo prototype.
	 *  http://www.w3schools.com/js/js_object_prototypes.asp
	 *  
	 *  Utilizzare il prototype e' una best practice JavaScript per consentire l'estensione di oggetti
	*/
	HomeCtrl.prototype.getHello = function(name) {
		return "Hello, " + name;
	};

	/* 
     * Definisco il Controller HomeChild
     */
	function HomeChildCtrl() {
    }

	/*
	 * Assegno al prototype del Controller HomeChild il prototype del Controller Home.
	 * Tecnica per estendere un Controller in modo da utilizzare i metodi del Controller padre
	 */
	HomeChildCtrl.prototype = Object.create(HomeCtrl.prototype);

	return homeControllers;
});