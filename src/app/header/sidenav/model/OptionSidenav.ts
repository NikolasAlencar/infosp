export interface OptionSidenav {
  name: string;
  desc: string;
  src: string;
  path?: string;
}

export interface OptionsSidenav extends Array<OptionSidenav> {}
