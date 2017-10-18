'use strict';

const Validator = require('validator');
const URL = require('url-parse');

exports.register = (server, options, next) => {

  let trueUrl, paramIndex, hostNamev2, mergedUri;

  server.ext('onRequest', (request, reply) => {

    var pathArray = request.path.split("/");

    for (let i in pathArray) {

        if (Validator.isURL(pathArray[i])) {

            paramIndex = pathArray.indexOf(pathArray[i]);
            trueUrl = new URL(pathArray[i]);
            // console.log(trueUrl)
            trueUrl.set('pathname', options.newHostname);
            hostNamev2 = trueUrl.pathname.replace('/','');
            // console.log(pathArray)
            if (paramIndex !== -1) {
                pathArray[paramIndex] = hostNamev2;
                mergedUri = pathArray.join('/');
                request['path'] = mergedUri;
                request.url['href'] = mergedUri;
                request.url['path'] = mergedUri;
                request.url['pathname'] = mergedUri;
                request.raw.req['ur;'] = mergedUri;
                return reply(request);
            }
        }
    }
  });
  return next();
};


exports.register.attributes = {

    pkg: require('../package.json')
};
