import Router from "./router";

describe("Шаблонизатор", () => {
  const router = new Router("#root");

  it("Проверка обработки", () => {
    router.go("/sign-up");
    expect(router.history.length).toBe(4);
  });
});
