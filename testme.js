'use strict';

const Urlchanger = require('./lib/index');
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    port: '8080'
});


server.route({
    path: '/www.facebook.com/lolol/test',
    method: 'GET',

    handler: function (request, reply) {
        reply('HELLO');
        console.log(request)
    }
});


server.route({
    path: '/test/test',
    method: 'GET',

    handler: function (request, reply) {
        reply('HI');
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
