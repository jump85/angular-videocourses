/*
 * File per la definizione dei Service Angular, ovvero oggetti che espongono funzionalita' condivise tra diversi Controller:
 * https://code.angularjs.org/1.4.3/docs/guide/services
 */
define([
	'angular'
],
function(angular) {

	var messageServices = angular.module('messageServices', []);

	messageServices.service('MessageService', ['$rootScope', MessageService]);

	/*
	 * Service per la visualizzazione dei messaggi
	 */
	function MessageService($rootScope) {
		/*
		 * Variabili private
		 */
		var _errorMessages = [];
		var _infoMessages = [];
		var _successMessages = [];
		var _warningMessages = [];
 
		/*
		 * Flag privato per indicare se i messaggi precedenti sono stati gia' visualizzati
		 */
		var _isShown = false;
		
		/*
		 * Metodo privato per rimuovere tutti i messaggi
		 */
		var _clearMessages = function() {
			_errorMessages = [];
			_infoMessages = [];
			_successMessages = [];
			_warningMessages = [];

			_isShown = false;
		};

		/*
		 * Metodo pubblico per aggiungere i messaggi di ERROR
		 */
		this.addErrorMessages = function(messages) {
			if (_isShown)
				_clearMessages();

			for (var i in messages) {
				_errorMessages.push({
					'icon' : 'fa-exclamation-triangle',
	        		'text' : messages[i]
				});
			}
		};

        /*
		 * Metodo pubblico per aggiungere i messaggi di SUCCESS
		 */
		this.addInfoMessages = function(messages) {
			if (_isShown)
				_clearMessages();

			for (var i in messages) {
				_errorMessages.push({
					'icon' : 'fa-info-circle',
					'text' : messages[i]
				});
			}
		};

        /*
		 * Metodo pubblico per aggiungere i messaggi di INFO
		 */
		this.addSuccessMessages = function(messages) {
			if (_isShown)
				_clearMessages();

			for (var i in messages) {
				_errorMessages.push({
					'icon' : 'fa-check-circle',
					'text' : messages[i]
				});
			}
		};

        /*
		 * Metodo pubblico per aggiungere i messaggi di WARNING
		 */
		this.addWarningMessages = function(messages) {
			if (_isShown)
				_clearMessages();

			for (var i in messages) {
				_errorMessages.push({
					'icon' : 'fa-exclamation-triangle',
					'text' : messages[i]
				});
			}
		};

		/*
		 * Metodo pubblico per visualizzare i messaggi nella pagina
		 */
		this.showMessages = function() {
			/*
			 * Emetto l'evento per notificare l'aggiunta di nuovi messaggi.
			 * L'evento verra' intercettato dal MessageCtrl
			 */
			$rootScope.$broadcast('messagesUpdate');

			_isShown = true;
        };

		/*
		 * Metodo pubblico per ottenere tutti i messaggi
		 */
		this.getAllMessages = function() {
			var _messages = {};

			if (_infoMessages.length > 0)
				_messages["success"] = _successMessages;
			if (_warningMessages.length > 0)
				_messages["info"] = _infoMessages;
			if (_successMessages.length > 0)
				_messages["warning"] = _warningMessages;
			if (_errorMessages.length > 0)
				_messages["danger"] = _errorMessages;

			return _messages;
		};

		/*
		 * Metodo pubblico per rimuovere tutti i messaggi
		 */
		this.clearMessages = function() {
			/*
			 * Cancello eventuali messaggi precedenti
			 */
			_clearMessages();
			/*
			 * Emetto l'evento per notificare l'aggiornamento dei messaggi.
			 * L'evento verra' intercettato dal MessageCtrl
			 */
			$rootScope.$broadcast('messagesUpdate');
		};
		
		/*
		 * Metodo pubblico per aggiungere tutte le label dei campi in errore
		 */
		this.addLabelsToError = function(form){
			var labels = document.getElementsByTagName('LABEL');

			for(var campo in form){
				if(campo.substring(0,1) != '$' && form[campo].$invalid){
					for(var i in labels)
						if(labels[i].htmlFor == campo){
							var nomeCampo = labels[i].textContent.split("*")[0];
							var nomeCampo1 = '';
							if(labels[i].dataset && labels[i].dataset.context)
								nomeCampo1 = ' ('+labels[i].dataset.context+')';
							this.addErrorMessages(['Campo '+nomeCampo+nomeCampo1+' obbligatorio o contenente caratteri invalidi']);
						}
				}
			}
		}
	};
	
	return messageServices;	
});