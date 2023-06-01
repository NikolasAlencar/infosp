export interface OptionRegister {
  name: string;
  desc: string;
  placeholder: string;
}

export interface OptionsRegister extends Array<OptionRegister> {}
