var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/-spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
	baseUrl: '/base',

	paths :{
		'app' : 'app/app',
		'config' : 'app/config',
		'commonControllers' : 'app/controllers/common-controllers',
		'homeControllers' : 'app/controllers/home-controllers',
		'fornitoriControllers' : 'app/controllers/fornitori-controllers',
		'testControllers' : 'app/controllers/test-controllers',
//		'homeDirectives' : 'app/directives/home-directives',
		'commonFilters' : 'app/filters/common-filters',
		'messageServices' : 'app/services/message-services',
		'resourceServices' : 'app/services/resource-services',
		'statusCodeInterceptorServices' : 'app/services/status-code-interceptor-services',
		'jquery' : 'libs/jquery.min',
		'bootstrap' : 'libs/bootstrap.min',
		'angular' : 'libs/angular',
		'angularLocale' : 'libs/angular-locale_it-it',
		'angularRoute' : 'libs/angular-route.min',
		'angularMock' :'libs/angular-mocks'
	},
	shim: {
		'jquery': {
			exports: 'jquery'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: 'bootstrap'
		},
		'angular': {
			deps: ['jquery'],
			exports: 'angular'
		},
		'angularLocale': {
			deps: ['angular'],
			exports : 'angularLocale'
		},
		'angularRoute': {
			deps: ['angular'],
			exports : 'angularRoute'
		},
		'angularMock' :{
            deps: ['angular'],
            exports : 'angularMock'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});