/*
 * Chiamata reale alla j_security_check,
 * commentata per testare i servizi non in sicurezza
 */
var URL_LOGIN = '/LoginWeb/j_security_check';
var HTTP_METHOD = 'POST';

/*
 * JSON locale per simulare una chiamata alla j_security_check,
 * da commentare se i servizi sono messi in sicurezza
 */
//var URL_LOGIN = "/MonitoraggioCriticitaWeb/login.json";
//var HTTP_METHOD = 'GET';

/*
 * Definisco le URL della homepage e della pagina di errore
 */
var HOME_PAGE = "/AreaGiochiDemoWeb/resources/#/";
var ERROR_PAGE = "/AreaGiochiDemoWeb/error.html";

$(document).ready(function() {
	/*
	 * Abilito il bottone di submit solo se entrambi i campi sono valorizzati
	 */
	$('#login-form input').on('keyup blur', function() {
		var empty = false;
		$('#login-form input').each(function() {
			if ($(this).val() == '') {
				empty = true;
			}
		});
		if (empty) {
			$('#login-button').prop('disabled', true);
		} else {
			$('#login-button').prop('disabled', false);
		}
	});

	$('#login-form').submit(function(event) {
		/*
		 * Prevengo il comportamento di default di una submit
		 */
		event.preventDefault();
		/*
		 * Disabilito il bottone di submit per evitare che l'utente (idiota) clicchi piu' volte
		 */
		$('#login-button').prop('disabled', true);
		/*
		 * Nascondo l'eventuale messaggio di errore precedente
		 */
		$('#message').hide();
		/*
		 * Effettuo la chiamata Ajax per l'autenticazione
		 */
		$.ajax({
			/*
        	 * Aggiungo alla URL il timestamp per evitare la cache
        	 */
        	url: URL_LOGIN + '?v=' + new Date().getTime()+'&j_username='+ $('#username').val()+'&j_password='+ $('#password').val(),
			type: HTTP_METHOD,
			data: {
				'j_username': $('#username').val(),
				'j_password': $('#password').val()
			},
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: 'json',
			traditional: true,
			headers: {
				"X-Content-Type-Options": "nosniff",
				"X-XSS-Protection": "1; mode=block",
				"X-Frame-Options": "deny",
				"Strict-Transport-Security": "max-age=16070400; includeSubDomains"
			},
			/*
			 * In caso di successo, richiamo la funzione per il controllo della risposta
			 */
			success: function(data) {
				getResult(data);
			},
			/*
			 * In caso di errore, rimando sulla pagina di errore
			 */
			error : function(req, status, error) {
				$(window.location).attr('href', ERROR_PAGE);
			}
		});
	});

	function getResult(result) {
		/*
		 * Controllo il JSON di risposta
		 */
		switch (result.returnCode) {
			/*
			 * In caso di successo, rimando sulla homepage
			 */
			case 0:
				$(window.location).attr('href', HOME_PAGE+'?'+btoa('user='+$('#username').val()+'&pass='+$('#password').val()));
				break;
			/*
			 * In caso di credenziali errate, ripulisco il campo password,
			 * disabilito il bottone di submit e mostro il messaggio di errore
			 */
			case 1:
				$('#password').val('');
				$('#login-button').prop('disabled', true);
				$('#message').html('<i class="fa fa-warning"></i> ' + result.message).css('display', 'block');
				break;
			/*
			 * In caso di errore lato server, rimando sulla pagina di errore
			 */
			case 2:
				$(window.location).attr('href', ERROR_PAGE);
				break;
			/*
			 * Negli altri casi (sconosciuti), rimango sulla pagina di login
			 */
			default:
				break;
		}
	}
});