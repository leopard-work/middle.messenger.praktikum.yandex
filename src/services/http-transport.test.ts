import { HTTPTransport } from "./http-transport";
import { BASE_API_PATH } from "../api";

const http = new HTTPTransport();

describe("HTTPTransport", () => {
  it("Проверка get", (done) => {
    http.get(`${BASE_API_PATH}chats`).then(() => {
      done();
    });
  });

  it("Проверка post", (done) => {
    http
      .post(`${BASE_API_PATH}auth/signin`, {
        data: { login: "test", password: "test" },
      })
      .then(() => {
        done();
      });
  });

  it("Проверка delete", (done) => {
    http
      .post(`${BASE_API_PATH}chats`, {
        data: { chatId: -1 },
      })
      .then(() => {
        done();
      });
  });
});
