'use strict';

const validUrl = require('valid-url');
const URL = require('url-parse');
const internals = {}

internals.checkURI = function(next) {
  if(validUrl.isUri(internals.options.oldUrl)) {
    var url = new URL(internals.options.oldUrl);
    url.set('hostname', internals.options.newUrl);
    return next(url.href);
  } else {
    return next('not a valid url');
  }
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
