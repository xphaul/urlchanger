'use strict';

const Urlchanger = require('./lib/index');
const Hapi = require('hapi');
const server = new Hapi.Server();
const url = 'https://www.facebook.com';
const newHostname = 'twittwe.com';

server.connection({
    port: '8080'
});

server.register({
    register: Urlchanger,
    options: {
        oldUrl: url,
        newUrl: newHostname
    }
});


server.route({
    path: '/{path}',
    method: 'GET',

    handler: function (request, reply) {

        request.server.plugins.Urlchanger.checkURI((res) => {

            return reply(res);
        });
    }
});


server.start((err) => {

    if (err) {
        throw err;
    }
});
