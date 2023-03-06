import Component from "../component";
import Store from "./store";
import { BlockProps, storeProps } from "../../utils/types";

type connectProps = {
  new (tag: string, props: BlockProps): Component;
};

export default function connect(
  Component: connectProps,
  mapStateToProps: (props: storeProps) => Record<string, unknown> | {} // eslint-disable-line
) {
  return class extends Component {
    constructor(tag: string, props = {}) {
      const store = new Store();

      super(tag, { ...props, ...mapStateToProps(store.getState()) });

      store.on(Store.EVENT_UPDATE, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
