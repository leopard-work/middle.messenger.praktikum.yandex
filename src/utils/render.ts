import Component from "../services/component";

const render = (query: string, block: Component) => {
  const root = document.querySelector(query);
  root!.innerHTML = "";
  root!.appendChild(block.getContent());
  return root;
};

export default render;
