import { HTTPTransport } from "../../services/http-transport";

export const BASEAPI = "https://ya-praktikum.tech/api/v2/";

const http = new HTTPTransport();

class apiUserService {
  signUp(data: any) {
    return http.post(`${BASEAPI}auth/signup`, { data: data });
  }
  signIn(data: any) {
    return http.post(`${BASEAPI}auth/signin`, { data: data });
  }
  logOut() {
    return http.post(`${BASEAPI}auth/logout`);
  }
  userInfo() {
    return http.get(`${BASEAPI}auth/user`);
  }
  editProfile(data: any) {
    return http.put(`${BASEAPI}user/profile`, { data: data });
  }
  editPassword(data: any) {
    return http.put(`${BASEAPI}user/password`, { data: data });
  }
  changeAvatar(data: any) {
    return http.put(`${BASEAPI}user/profile/avatar`, { data: data });
  }
}

export const apiUser = new apiUserService();
