import Component from "./component";

const child = new Component("div", { template: "" });
const block = new Component("div", { template: "", child: child });

describe("Блок", () => {
  it("Проверка пропсов", () => {
    expect(block.props.template).toBe("");
  });

  it("Проверка изменения пропсов", () => {
    block.setProps({ template: "test" });
    expect(block.props.template).toBe("test");
  });

  it("Проверка children", () => {
    expect(JSON.stringify(block.children)).not.toBe(JSON.stringify({}));
  });

  it("Проверка uuid", () => {
    expect(block._id).not.toBe("");
  });
});
