import Component from "../../services/component";
import { router } from "../../index";

type LinkProps = {
  children: string;
  href: string;
  class?: string;
  title?: string;
};

const Link = (props: LinkProps) => {
  const attr: Partial<LinkProps> = { ...props };
  delete attr.children;
  return new Component("a", {
    children: props.children,
    template: "{{children}}",
    attr: {
      ...props,
    },
    events: {
      click: (event: Event) => {
        event.preventDefault();
        router.go(props.href);
      },
    },
  });
};

export default Link;
