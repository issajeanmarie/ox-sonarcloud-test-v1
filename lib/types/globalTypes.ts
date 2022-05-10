export type MenuTypes = {
  menus: array;
  name: string;
  active: boolean;
  url: string;
};

export type CircleCheckBoxTypes = {
  defaultValue: boolean;
  checked: boolean;
  state: boolean;
  setState: function;
};

export type DropIconTypes = {
  focused: boolean;
  loading: boolean;
  showSearch: boolean;
  width: string;
};
