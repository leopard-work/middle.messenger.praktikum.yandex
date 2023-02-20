import HTTPTransport from "../../services/http-transport";

const baseUrl = "https://ya-praktikum.tech/api/v2/";

const http = new HTTPTransport();

class apiUserService {
  signUp(data: any) {
    return http.post(`${baseUrl}auth/signup`, { data: data });
  }
  signIn(data: any) {
    return http.post(`${baseUrl}auth/signin`, { data: data });
  }
  logOut() {
    return http.post(`${baseUrl}auth/logout`);
  }
  userInfo() {
    return http.get(`${baseUrl}auth/user`);
  }
}

export const apiUser = new apiUserService();
