const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

type HTTPTransportOptionsProps = {
  method: string;
  headers?: Record<string, string>;
  data?: { [key: string]: any } | string;
  timeout?: number;
};

type HTTPTransportMethodProps = (
  url: string,
  options?: HTTPTransportOptionsProps
) => Promise<unknown>;

const queryStringify = (data: HTTPTransportOptionsProps["data"]) => {
  const urlParse = new URLSearchParams(data);
  let result = "?";
  for (const [i, element] of urlParse.entries()) {
    if (i) result += `&`;
    result += `${element[0]}=${element[1]}`;
  }
  return result;
};

class HTTPTransport {
  get: HTTPTransportMethodProps = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options?.timeout
    );
  };

  post: HTTPTransportMethodProps = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options?.timeout
    );
  };

  put: HTTPTransportMethodProps = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options?.timeout
    );
  };

  delete: HTTPTransportMethodProps = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options?.timeout
    );
  };

  request = (
    url: string,
    options: HTTPTransportOptionsProps,
    timeout = 5000
  ) => {
    let { data, headers, method } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET && data) url += queryStringify(data);

      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (headers) {
        for (let key in headers) {
          if (headers.hasOwnProperty(key))
            xhr.setRequestHeader(key, headers[key]);
        }
      }

      if (!data || method === METHODS.GET) {
        xhr.send();
      } else {
        data = JSON.stringify(data);
        xhr.send(data);
      }
    });
  };
}
