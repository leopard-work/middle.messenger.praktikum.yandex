import Component from "../services/component";

const render = (query: string, block: Component) => {
  const root = document.querySelector(query);
  if (root != null) {
    root.innerHTML = "";
    root.appendChild(block.getContent());
  }
  return root;
};

export default render;
