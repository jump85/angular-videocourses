/*
 * File per la definizione dei Controller Angular:
 * https://code.angularjs.org/1.4.3/docs/guide/controller
 */
define([
	'angular'
],
function(angular) {

	var videoControllers = angular.module('videoControllers', []);

	/*
	 * Le dipendenze dei Controller sono definite come stringhe per evitare problemi in caso di minificazione dei file .js
	 * https://code.angularjs.org/1.4.3/docs/tutorial/step_05
	 */
	videoControllers.controller('VideoCtrl', [VideoCtrl]);

	/*
     * Definisco il Controller Home
     */
	function VideoCtrl() {

		var domain = "meet.jit.si";
		var room = "JitsiMeetAPIExample";
		var width = 700;
		var height = 700;
		var htmlElement = document.querySelector('#meet');
		var api = new JitsiMeetExternalAPI(domain, room, width, height, htmlElement);
	}

	return videoControllers;
});
