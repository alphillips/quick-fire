#!/usr/bin/env node

var quickfireServer  = require('../lib/quick-fire-server');
var program = require('commander');

var default_port = 4000;

  program
    .version('0.0.1')
    .command('start')
    .alias('s')
    .description('Starts Quick Fire server')
    .option("-p, --port [port]", "Which port to listen on (default is " + default_port + ")")
    .action(function(options){
      quickfireServer.listen(options.port || default_port, function () {
        console.log('Quickfire started on http://localhost:%s/', options.port || default_port);
      });
  })

program.parse(process.argv);
