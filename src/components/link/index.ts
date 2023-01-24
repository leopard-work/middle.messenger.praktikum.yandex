// export type linkProps = {
//   title: string;
//   href: string;
//   className?: string;
// };
//
// export const link = ({ title = "", href = "", className = "" }: linkProps) => {
//   return `<a rel="link" class="${className}" href="${href}">${title}</a>`;
// };

import Component from "../../services/component";

const Link = (props: any) => {
  return new Component("a", {
    ...props,
    template: "{{title}}",
    events: {
      click: (event: Event) => {
        event.preventDefault();
        alert("ok");
      },
    },
  });
};

export default Link;
