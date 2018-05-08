Url Parameter Append
====================

[![Build Status](https://travis-ci.org/techinity/url-parameter-append.svg?branch=master)](https://travis-ci.org/techinity/url-parameter-append)

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

How to Use
----------

__Reference the package__
```
const urlParameterAppend = require('url-parameter-append');
```

__Add querystring__


```
const url = urlParameterAppend('http://example.com/', 'search', 'test');
console.log(url);
```

```
> http://example.com/?search=test
```

__or__
```
const url = urlParameterAppend('http://example.com/', {search: 'test'});
console.log(url);
```

```
> http://example.com/?search=test
```

__Replace parameter__
```
const url = urlParameterAppend('http://example.com/?search=test', 'search', 'other');
console.log(url);

```

```
> http://example.com/?search=other
```

__or__
```
const url = urlParameterAppend('http://example.com/?search=test', {search: 'other'});
console.log(url);

```

```
> http://example.com/?search=other
```

__Remove parameter__
```
const url = urlParameterAppend('http://example.com/?search=test', 'search', null);
console.log(url);
```

```
> http://example.com/
```

__or__
```
const url = urlParameterAppend('http://example.com/?search=test', {search: null});
console.log(url);
```

```
> http://example.com/
```

More examples can be found in [url-parameter-append.spec.js](url-parameter-append.spec.js)





Tests use the [jest](https://github.com/facebook/jest) testing framework.
