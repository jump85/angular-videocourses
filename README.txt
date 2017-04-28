Versione 1.5.2

AngularStarterKit è un'applicazione web responsive in HTML5, creata per testare le recenti tecnologie JavaScript e CSS.
Il progetto ha lo scopo di fornire un punto di partenza per lo sviluppo di applicazioni web client-side, basate sul framework AngularJS.

--- AMBIENTE ---

AngularStarterKit, per sua natura, è un progetto web statico che può essere lanciato con un qualsiasi web server.
All'interno del repository SVN c'è anche il progetto RestServices, che espone i servizi REST utilizzati da AngularStarterKit.
RestServices è un progetto Java EE che, a differenza di AngularStarterKit, deve essere lanciato con WebSphere.

Per richiamare i servizi REST esposti dal progetto RestServices si possono percorrere due strade:

1 - Creare un nuovo progetto web dinamico con il relativo progetto EAR,
	includere i file di AngularStarterKit nel nuovo progetto web,
	lanciare il relativo progetto EAR sullo stesso server WebSphere del progetto RestServices.

2 - Fare il deploy del progetto AngularStarterKit su un web server distinto da WebSphere,
	lanciare Chrome in modalità non protetta per consentire le chiamate Ajax cross domain:
	"path\to\chrome.exe" --disable-web-security

In ogni caso, per lo sviluppo di applicazioni client-side si consiglia di installare e utilizzare Chrome Canary:
https://www.google.it/chrome/browser/canary.html
Dal pannello DevTools di Chrome (F12) è possibile disabilitare la cache del browser (tab Network).

--- FRAMEWORK ---

Per realizzare AngularStarterKit sono stati utilizzati i seguenti framework JS e CSS:
	- RequireJS 2.1.22 - http://requirejs.org/
	- jQuery 2.1.4 - https://jquery.com/
	- AngularJS 1.4.8 - https://angularjs.org/
	- Bootstrap 3.3.6 - http://getbootstrap.com/
	- FontAwesome 4.5.0 - http://fontawesome.io/
	- Stacktrace JS 1.0.1 - http://www.stacktracejs.com/#!/docs/stacktrace-js

Le versioni di jQuery e AngularJS utilizzate NON supportano Internet Explorer 8.

--- SICUREZZA ---

Di default sono commentate le chiamate ai servizi di autenticazione, per poter testare la Home senza i servizi in sicurezza.
Le chiamate possono essere abilitate in login.js e common-controllers.js

--- TEST ---

Software da installare:
Node.js - https://nodejs.org/

Creare il file ".npmrc" nella cartella C:\Users\<utente> con il seguente contenuto:
registry=http://26.2.234.94:8081/nexus/content/repositories/npmjs/

Aprire la console di Windows e raggiungere la cartella "resources" del progetto importato da SVN.

Lanciare le seguenti istruzioni dalla cartella "resources":
npm install # Installa localmente le dipendenze NodeJS tramite npm.
npm install -g karma-cli # Installa globalmente la cli per lanciare i test con karma.

Lanciare i seguenti comandi dalla cartella "resources/scripts":
karma start karma.conf.js --log-level debug --single-run # Lancia i test.
npm start # Avvia il server in Node.js.

--- MINIFICAZIONE ---

Per minificare l'applicazione lanciare il seguente comando nella cartella scripts:
r.js.cmd -o app.build.js
Il comando genera l'applicazione minificata (webapp.min.js) e il source .map per il debug (webapp.min.js.map)