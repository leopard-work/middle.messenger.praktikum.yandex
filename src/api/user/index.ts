import { HTTPTransport } from "../../services/http-transport";
import {
  editPasswordProps,
  editProfileProps,
  signIpProps,
  signUpProps,
} from "../../utils/types";

export const BASEAPIPATH = "https://ya-praktikum.tech/api/v2/";

const http = new HTTPTransport();

class apiUserService {
  signUp(data: signUpProps) {
    return http.post(`${BASEAPIPATH}auth/signup`, { data: data });
  }
  signIn(data: signIpProps) {
    return http.post(`${BASEAPIPATH}auth/signin`, { data: data });
  }
  logOut() {
    return http.post(`${BASEAPIPATH}auth/logout`);
  }
  userInfo() {
    return http.get(`${BASEAPIPATH}auth/user`);
  }
  editProfile(data: editProfileProps) {
    return http.put(`${BASEAPIPATH}user/profile`, { data: data });
  }
  editPassword(data: editPasswordProps) {
    return http.put(`${BASEAPIPATH}user/password`, { data: data });
  }
  changeAvatar(data: FormData) {
    return http.put(`${BASEAPIPATH}user/profile/avatar`, { data: data });
  }
}

export const apiUser = new apiUserService();
