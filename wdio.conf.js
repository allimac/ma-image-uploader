exports.config = {

    specs: [
        './test/**/*.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'silent', // silent | verbose | command | data | result | error
    coloredLogs: true, // Enables colors for log output.
    screenshotPath: './test/errorShots/', // Saves a screenshot to a given path if a command fails.
    baseUrl: 'http://localhost', // Set a base URL in order to shorten url command calls.
    waitforTimeout: 10000, // Default timeout for all waitForXXX commands.
    framework: 'mocha', // Framework you want to run your specs with (mocha, jasmine and cucumber)
    reporter: 'spec', // Test reporter for stdout (dot (default), spec and xunit)
    mochaOpts: { // Options to be passed to Mocha.
        ui: 'bdd'
    },

    // =====
    // Hooks
    // =====
    // Run functions before or after the test. If one of them returns with a promise, WebdriverIO
    // will wait until that promise got resolved to continue.
    //
    // Gets executed before all workers get launched.
    onPrepare: function() {
        // do something
    },
    //
    // Gets executed before test execution begins. At this point you will have access to all global
    // variables like `browser`. It is the perfect place to define custom commands.
    before: function() {
        // do something
    },
    //
    // Gets executed after all tests are done. You still have access to all global variables from
    // the test.
    after: function(failures, pid) {
        // do something
    },
    //
    // Gets executed after all workers got shut down and the process is about to exit. It is not
    // possible to defer the end of the process using a promise.
    onComplete: function() {
        // do something
    }
};
