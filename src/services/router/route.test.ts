import Route from "./route";
import Component from "../component";

const block = () => {
  return new Component("div", {});
};
let route = new Route("/", block, {
  rootQuery: "#root",
});

describe("Route", () => {
  it("Проверка блока", () => {
    route.render();
    expect(route._block).not.toBe(null);
  });

  it("Проверка неверного пути", () => {
    route.navigate("/test");
    expect(route._pathname).toBe("/");
  });

  it("Проверка скрытия блока", () => {
    route.leave();
    expect(route._block).not.toBe(null);
  });
});
