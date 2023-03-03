import Router from "./router";

const root = "#root";
const page = "/page";
const router = new Router("#root");

describe("Router", () => {
  it("Проверка корня", () => {
    expect(router._rootQuery).toBe(root);
  });

  it("Проверка пути ошибки 500", () => {
    router.setError500Path(page);
    expect(router._error500Path).toBe(page);
  });

  it("Проверка пути незарегистированного пользователя", () => {
    router.setProtectUserPath(page);
    expect(router._protectUserPath).toBe(page);
  });

  it("Проверка пути зарегистированного пользователя", () => {
    router.setProtectNoUserPath(page);
    expect(router._protectNoUserPath).toBe(page);
  });
});
