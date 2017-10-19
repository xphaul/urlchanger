'use strict';

const Validator = require('validator');
const URL = require('url-parse');
const async = require("async");
const series = require("async/series");

exports.register = (server, options, next) => {

  let trueUrl, paramIndex, hostNamev2, mergedUri;

  server.ext('onPostAuth', (request, reply) => {

    async.series([
      function (callback) {

        var pathArray = request.path.split("/");

        for (let i in pathArray) {

            if (Validator.isURL(pathArray[i])) {

                paramIndex = pathArray.indexOf(pathArray[i]);
                trueUrl = new URL(pathArray[i]);
                trueUrl.set('pathname', options.newHostname);
                hostNamev2 = trueUrl.pathname.replace('/','');

                if (paramIndex !== -1) {

                    pathArray[paramIndex] = hostNamev2;
                    mergedUri = pathArray.join('/');
                    request['path'] = mergedUri;
                    request.url['href'] = mergedUri;
                    request.url['path'] = mergedUri;
                    request.url['pathname'] = mergedUri;
                    request.raw.req['url'] = mergedUri;
                    callback(null, request);
                }
            }
        }
      },
      function(callback) {

        callback(null)
        return reply.continue();
      }
    ]);
  });
  return next();
};


exports.register.attributes = {

    pkg: require('../package.json')
};
