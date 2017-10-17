# urlchanger

## Installation


## Usage
```js
const urlchanger = require('urlchanger');

server.register({
    register: urlchanger,
    options: {
      oldUrl: url,
      newUrl: newHostname
    }
});
```
* `oldUrl` - Your URL you want to change
* `newUrl` - The new hostname you want to change your old hostname to

## Changing url hostname
```js
request.server.plugins.urlchanger.checkURI((res) => {
    return reply(res);
});
```

## Contributing
* Include 100% test coverage.
* Follow the [Hapi coding conventions](http://hapijs.com/styleguide)
* Submit an issue first for significant changes
