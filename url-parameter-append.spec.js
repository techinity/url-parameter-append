const urlParameterAppend = require('./url-parameter-append');

describe('urlParameterAppend', () => {
  it('should return the url if there the modification config if not specified', () => {
    const url = 'http://example.com/';

    const result = urlParameterAppend(url);

    expect(result).toEqual(url);
  });

  describe('adding parameters', () => {
    it('should add the parameter to a url without any existing querystring values', () => {
      const result = urlParameterAppend('http://example.com/', 'param', 'value');

      expect(result).toEqual('http://example.com/?param=value');
    });

    it('should add the parameter to a url with an existing querystring values', () => {
      const result = urlParameterAppend('http://example.com/?existing=true', 'param', 'value');

      expect(result).toEqual('http://example.com/?existing=true&param=value');
    });
  });

  describe('updating parameters', () => {
    it('should update the parameter in the url without any existing querystring values', () => {
      const result = urlParameterAppend('http://example.com/?updated=false', 'updated', true);

      expect(result).toEqual('http://example.com/?updated=true');
    });
  });

  describe('removing parameters', () => {
    it('should leave the url intact if the parameter does not exist', () => {
      const result = urlParameterAppend('http://example.com/?param=value', 'does-not-exist', null);

      expect(result).toEqual('http://example.com/?param=value');
    });

    it('should remove the only parameter from the url', () => {
      const result = urlParameterAppend('http://example.com/?existing=true', 'existing', null);

      expect(result).toEqual('http://example.com/');
    });

    it('should remove the first parameter leaving other parameters in the url intact', () => {
      const result = urlParameterAppend('http://example.com/?remove=me&keep=me', 'remove', null);

      expect(result).toEqual('http://example.com/?keep=me');
    });

    it('should remove a middle parameter leaving other parameters in the url intact', () => {
      const result = urlParameterAppend('http://example.com/?existing=true&remove=me&keep=me', 'remove', null);

      expect(result).toEqual('http://example.com/?existing=true&keep=me');
    });

    it('should remove the last parameter leaving other parameters in the url intact', () => {
      const result = urlParameterAppend('http://example.com/?existing=true&keep=me&remove=me', 'remove', null);

      expect(result).toEqual('http://example.com/?existing=true&keep=me');
    });

    it('should remove the only parameter', () => {
      const result = urlParameterAppend('http://example.com/?remove=me', 'remove', null);

      expect(result).toEqual('http://example.com/');
    });
  });

  describe('multiple parameters', () => {
    it('should handle multiple additions, updates and removals in a single call', () => {
      const url = 'https://example.com/?existing=true&updated=no';

      const result = urlParameterAppend(url, 'new-param', 'value', 'existing', null, 'updated', 'yes');

      expect(result).toEqual('https://example.com/?updated=yes&new-param=value');
    });
  });
});
