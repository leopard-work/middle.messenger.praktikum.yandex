import { HTTPTransport } from "../../services/http-transport";
import {
  editPasswordProps,
  editProfileProps,
  searchUserProps,
  signIpProps,
  signUpProps,
} from "../../utils/types";
import { BASE_API_PATH } from "../index";

const http = new HTTPTransport();

class apiUserService {
  signUp(data: signUpProps) {
    return http.post(`${BASE_API_PATH}auth/signup`, { data: data });
  }
  signIn(data: signIpProps) {
    return http.post(`${BASE_API_PATH}auth/signin`, { data: data });
  }
  logOut() {
    return http.post(`${BASE_API_PATH}auth/logout`);
  }
  userInfo() {
    return http.get(`${BASE_API_PATH}auth/user`);
  }
  editProfile(data: editProfileProps) {
    return http.put(`${BASE_API_PATH}user/profile`, { data: data });
  }
  editPassword(data: editPasswordProps) {
    return http.put(`${BASE_API_PATH}user/password`, { data: data });
  }
  changeAvatar(data: FormData) {
    return http.put(`${BASE_API_PATH}user/profile/avatar`, { data: data });
  }
  searchUser(data: searchUserProps) {
    return http.post(`${BASE_API_PATH}user/search`, { data: data });
  }
}

export const apiUser = new apiUserService();
