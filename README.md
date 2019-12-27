Url Parameter Append
====================

A quick and easy utility method for adding, updating or removing querystring parameters.

Installation
------------

```bash
npm install url-parameter-append
```

Tests
-----

Tests can be executed using the following:

```bash
npm test
```

How to use
----------

__Reference the package:__
```javascript
const urlParameterAppend = require('url-parameter-append');
```
__or__
```javascript
import urlParameterAppend from 'url-parameter-append';
```

__Add querystring:__
```javascript
const url = urlParameterAppend('http://example.com/', 'search', 'test');
console.log(url);
```

```
http://example.com/?search=test
```

__or__
```javascript
const url = urlParameterAppend('http://example.com/', {search: 'test'});
console.log(url);
```

```
http://example.com/?search=test
```

__Replace parameter:__
```javascript
const url = urlParameterAppend('http://example.com/?search=test', 'search', 'other');
console.log(url);

```

```
http://example.com/?search=other
```

__or__
```javascript
const url = urlParameterAppend('http://example.com/?search=test', {search: 'other'});
console.log(url);

```

```
http://example.com/?search=other
```

__Remove parameter:__
```javascript
const url = urlParameterAppend('http://example.com/?search=test', 'search', null);
console.log(url);
```

```
http://example.com/
```

__or__
```javascript
const url = urlParameterAppend('http://example.com/?search=test', {search: null});
console.log(url);
```

```
http://example.com/
```

More examples can be found in [url-parameter-append.spec.ts](src/url-parameter-append.spec.ts)

Tests use the [jest](https://github.com/facebook/jest) testing framework.
