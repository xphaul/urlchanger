'use strict';

const Validator = require('validator');
const URL = require('url-parse');
const Async = require('async');

const internals = {};

internals.changeItem = function (data, next) {

    Object.keys(data.data).forEach((key) => {

        if (Validator.isURL(data.data[key])) {
            return next(null, key);
        }
    });
};

exports.register = (server, options, next) => {

    let trueUrl;
    let paramIndex;
    let hostNamev2;
    let mergedUri;
    let pathArray;
    let payload;
    let query;

    server.ext('onPostAuth', (request, reply) => {

        Async.series([
            function (callback) {

                pathArray = request.path.split('/');
                payload = request.payload;
                query = request.query;


                if (query !== {}) {
                    if (payload) {
                        internals.changeItem({
                            data: payload
                        }, (err, res) => {

                            if (err) {
                                throw err;
                            }

                            request.payload[res] = options.newHostname;
                        });
                    }

                    internals.changeItem({
                        data: query
                    }, (err, res) => {

                        if (err) {
                            throw err;
                        }

                        request.query[res] = options.newHostname;
                    });
                }

                for (const i in pathArray) {

                    if (Validator.isURL(pathArray[i])) {

                        paramIndex = pathArray.indexOf(pathArray[i]);
                        trueUrl = new URL(pathArray[i]);
                        trueUrl.set('pathname', options.newHostname);
                        hostNamev2 = trueUrl.pathname.replace('/','');

                        if (paramIndex !== -1) {

                            pathArray[paramIndex] = hostNamev2;
                            mergedUri = pathArray.join('/');
                            request.path = mergedUri;
                            request.href = mergedUri;
                            request.url.path = mergedUri;
                            request.url.pathname = mergedUri;
                            request.raw.req.url = mergedUri;

                        }
                    }
                }

                callback(null, request);
                return reply.continue();

            }
        ]);
    });

    return next();
};


exports.register.attributes = {

    pkg: require('../package.json')
};
