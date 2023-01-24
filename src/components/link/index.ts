import Component from "../../services/component";
import { pageOpen } from "../../index";

type LinkProps = {
  title: string,
  href: string,
  class?: string
}

const Link = (props: LinkProps) => {
  const attr:Partial<LinkProps> = {...props};
  delete attr.title;
  console.log(attr);
  return new Component("a", {
    title: props.title,
    template: "{{title}}",
    attr: {
      ...props
    },
    events: {
      click: (event: Event) => {
        event.preventDefault();
        pageOpen(props.href);
        window.history.pushState(null, "", props.href);
      },
    },
  });
};

export default Link;
