import { HTTPTransport } from "../../services/http-transport";
import {
  editPasswordProps,
  editProfileProps,
  searchUserProps,
  signIpProps,
  signUpProps,
} from "../../utils/types";
import { BASEAPIPATH } from "../index";

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
  searchUser(data: searchUserProps) {
    return http.post(`${BASEAPIPATH}user/search`, { data: data });
  }
}

export const apiUser = new apiUserService();
