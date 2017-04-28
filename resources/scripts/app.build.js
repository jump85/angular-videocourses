({
    baseUrl: ".",
    mainConfigFile: 'app/main.js',
    preserveLicenseComments: false, //comment in production
    out: 'webapp.min.js',
    generateSourceMaps: true,
    optimize: 'uglify2',
    include: ['../scripts/app/main'],
    paths: {
        'jquery': "empty:",
		'bootstrap' : "empty:",
		'angular' : "empty:",
		'angularLocale' : "empty:",
		'angularRoute' : "empty:",
		'stackframe' : "empty:",
		'error-stack-parser' : "empty:"
    }
})