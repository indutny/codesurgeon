var write = require('nodeunit').testCase;
var Codesurgeon = require('../lib/codesurgeon').Codesurgeon;
var vm = require('vm');
var fs = require('fs');

module.exports = write({

  setUp: function (callback) {
    callback();
  },

  tearDown: function (callback) {
    callback();
  },

  '1. Extract a method by `simple` name and write the contents to a new file.': function (test) {
    var surgeon = new Codesurgeon;

    var sandbox = {};

    surgeon
      .configure({ 
        quiet: true, 
        package: '../package.json' 
      })
      .read(__dirname + '/dummy.js')
      .extract('test5')
      .write('write-test-output.js');

      console.log(surgeon.newfile)

    var file = fs.readFileSync(surgeon.newfile, 'utf8');
    vm.runInNewContext(file, sandbox, 'sandbox.vm');
    
    test.ok(sandbox.test5(), 'The function was extracted and executed.')
    
    test.expect(1);
    test.done();
  }
});