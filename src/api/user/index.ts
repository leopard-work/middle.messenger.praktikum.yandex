import HTTPTransport from "../../services/http-transport";

const baseUrl = "https://ya-praktikum.tech/api/v2/";

const http = new HTTPTransport();

class apiUserService {
  signup(data: any) {
    return http.post(`${baseUrl}auth/signup`, { data: data });
  }
}

export const apiUser = new apiUserService();
