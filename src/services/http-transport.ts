const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

type HTTPTransportOptionsProps = {
  method: string;
  headers?: Record<string, string>;
  data?: Record<string, string> | string;
  timeout?: number;
};

type HTTPTransportMethodProps = (
  url: string,
  options?: Omit<HTTPTransportOptionsProps, "method">
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

export class HTTPTransport {
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

  request(
    url: string,
    options: HTTPTransportOptionsProps,
    timeout = 5000
  ): Promise<XMLHttpRequest> {
    const { method, data, headers } = options;

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

      if (data instanceof FormData) {
      } else xhr.setRequestHeader("Content-Type", "application/json");

      if (headers) {
        for (const key in headers) {
          if (Object.prototype.hasOwnProperty.call(headers, key))
            xhr.setRequestHeader(key, headers[key]);
        }
      }

      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
