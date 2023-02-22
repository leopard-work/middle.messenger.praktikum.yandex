import { HTTPTransport } from "../../services/http-transport";
import {
  editPasswordProps,
  editProfileProps,
  signIpProps,
  signUpProps,
} from "../../utils/types";

export const BASEAPI = "https://ya-praktikum.tech/api/v2/";

const http = new HTTPTransport();

class apiUserService {
  signUp(data: signUpProps) {
    return http.post(`${BASEAPI}auth/signup`, { data: data });
  }
  signIn(data: signIpProps) {
    return http.post(`${BASEAPI}auth/signin`, { data: data });
  }
  logOut() {
    return http.post(`${BASEAPI}auth/logout`);
  }
  userInfo() {
    return http.get(`${BASEAPI}auth/user`);
  }
  editProfile(data: editProfileProps) {
    return http.put(`${BASEAPI}user/profile`, { data: data });
  }
  editPassword(data: editPasswordProps) {
    return http.put(`${BASEAPI}user/password`, { data: data });
  }
  changeAvatar(data: FormData) {
    return http.put(`${BASEAPI}user/profile/avatar`, { data: data });
  }
}

export const apiUser = new apiUserService();
