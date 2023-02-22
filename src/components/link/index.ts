import Component from "../../services/component";
import { router } from "../../index";

type LinkProps = {
  children: string;
  href: string;
  class?: string;
  title?: string;
  onClick?: () => void;
  modal?: string;
};

const Link = (props: LinkProps) => {
  const attr: Partial<LinkProps> = { ...props };
  delete attr.children;
  return new Component("a", {
    children: props.children,
    template: "{{children}}",
    attr: {
      ...attr,
    },
    events: {
      click: (event: Event) => {
        event.preventDefault();
        if (props.onClick) props.onClick();
        else router.go(props.href);
      },
    },
  });
};

export default Link;
