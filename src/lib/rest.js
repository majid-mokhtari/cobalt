export const baseUrl = "http://localhost:8000";

export const Rest = {
  request(method, url, body, headers) {
    // Build up request headers
    const targetUrl = `${baseUrl}${url}`;
    headers = headers || {};
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    // Build up request body
    body = body ? JSON.stringify(body) : undefined;

    return fetch(targetUrl, {
      method,
      headers,
      body
    });
  },

  get(url, body) {
    let qs = Rest._buildQueryString(body);
    url += '?' + qs;
    return Rest.request('GET', url);
  },

  post(url, body) {
    return Rest.request('POST', url, body);
  },

  _buildQueryString(params) {
    let str = '';
    for (var key in params) {
      if (key) {
        str += key + '=' + params[key] + '&';
      }
    }
    str = str.slice(0, str.length - 1);
    return str;
  }
}
