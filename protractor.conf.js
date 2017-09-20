'use strict';

// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    baseUrl:'http://localhost:5000',
    framework: 'custom',
    restartBrowserBetweenTests: false,
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    ignoreUncaughtExceptions:true,
    params:{},
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-popup-blocking'],
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'default_directory': require('path').join( __dirname,'.tmp', 'downloads')
                }
            }
        }
    },
    specs: 'apps/*Application*/src/test/resources/**/*.feature',
    getPageTimeout: 60000,
    allScriptsTimeout: 90000,
    resultJsonOutputFile: '.tmp/protractor-test-results.json',
    cucumberOpts: {
        require: ['support/*.js', '.tmp/**/src/test/typescript/**/*.js'],
        format: 'pretty',
        tags: '@MobileCompleted'
    }
};
