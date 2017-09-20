var Cucumber = require('cucumber');
fs = require('fs-extra');
path = require('path');

var JsonFormatter = Cucumber.Listener.JsonFormatter();

var reportFile = '.tmp/cucumber-test-results.json';

module.exports = function JsonOutputHook() {
  JsonFormatter.log = function (json) {
    var destination = reportFile;
    fs.open(destination, 'a+', function (err, fd) {
      if (err) {
        fs.mkdirsSync(destination);
        fd = fs.openSync(destination, 'a+');
      }

      fs.writeSync(fd, json);

      console.log('json file location: ' + destination);
    });
  };

  this.registerListener(JsonFormatter);
};
