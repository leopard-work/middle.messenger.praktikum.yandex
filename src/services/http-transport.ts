const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

type HTTPTransportOptionsProps = {
  method: string;
  headers?: Record<string, string>;
  data?: Record<string, any> | string;
  timeout?: number;
};

type HTTPTransportMethodProps = (
  url: string,
  options?: HTTPTransportOptionsProps
) => Promise<XMLHttpRequest>;

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

  private request<Response>(url: string, options): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data as FormData);
      } else {
        xhr.send(JSON.stringify(data) as XMLHttpRequestBodyInit);
      }
    });
  }
}

export default HTTPTransport;
