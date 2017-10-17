'use strict';

const ValidUrl = require('valid-url');
const URL = require('url-parse');
const internals = {};

internals.checkURI = (next) => {

    if (internals.options.newUrl) {
        if (ValidUrl.isUri(internals.options.oldUrl)) {
            const url = new URL(internals.options.oldUrl);
            url.set('hostname', internals.options.newUrl);
            return next(url.href);
        }

        return next('not a valid url');
    }

    return next(internals.options.oldUrl);
};


exports.register = (server, options, next) => {

    internals.options = options;
    try {
        server.expose('checkURI', internals.checkURI);
    }
    catch (err) {
        return next(err);
    }
    next();
};


exports.register.attributes = {

    pkg: require('../package.json')
};
