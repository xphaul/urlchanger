'use strict';

const Urlchanger = require('./lib/index');
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    port: '8080'
});


server.route({
    path: '/{path}/{lolol}/{test}',
    method: 'GET',

    handler: function (request, reply) {
        reply()
    }
});


server.route({
    path: '/{path}/{test}',
    method: 'POST',

    handler: function (request, reply) {
        reply('HELLO')
    }
});



server.register({
    register: Urlchanger,
    options: {
        serverOptions: server,
        newHostname: 'twitter.com'
    }
});


server.start((err) => {

    if (err) {
        throw err;
    }
});
