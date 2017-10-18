'use strict';

const ValidUrl = require('valid-url');
const URL = require('url-parse');

exports.register = (server, options, next) => {
    let payload, path, url;
    // console.log(options.serverOptions[0].table.forEach((route) => console.log(`${route.params}\t${route.settings.payload}\t${route.path}\t${route.query}`)))
    try {
        options.serverOptions.table()[0].table.forEach((route) => {
            if (`${route.settings.payload}` || `${route.path}`) {
              url = new URL(options.serverOptions.info.uri);
              url.set('hostname', options.newHostname);
              return next(url);
            }
        })
    }
    catch (err) {
        return next(err);
    };
};


exports.register.attributes = {

    pkg: require('../package.json')
};
