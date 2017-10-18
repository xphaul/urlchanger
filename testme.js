'use strict';

const Urlchanger = require('./lib/index');
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    port: '8080'
});

server.route({
    path: '/{path}',
    method: 'GET',

    handler: function (request, reply) {
        reply('Hello');
    }
});


server.register({
    register: Urlchanger,
    options: {
        serverOptions: server,
        newHostname: 'twitter.com'
    }
}, (err) => {
  console.log('Data: ', err)
});


server.start((err) => {

    if (err) {
        throw err;
    }
});
