# urlchanger

## Installation


## Usage
```js
const Urlchanger = require('urlchanger');

server.register({
    register: Urlchanger,
    options: {
        serverOptions: server,
        newHostname: 'twitter.com'
    }
});
```
* `serverOptions` - Passing the instance of server to the plugin
* `newHostname` - The new hostname you want to change your URL to

## Contributing
* Include 100% test coverage.
* Follow the [Hapi coding conventions](http://hapijs.com/styleguide)
* Submit an issue first for significant changes
