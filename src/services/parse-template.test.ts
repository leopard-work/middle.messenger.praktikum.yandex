import parseTemplate from "./parse-template";

describe("Шаблонизатор", () => {
  it("Проверка обработки", () => {
    expect(parseTemplate("{{test}}", { test: "текст" })).toBe("текст");
  });
});
