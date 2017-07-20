import { ChoosyOption } from '../interfaces/index';

export const formatRawOption = (option: any): ChoosyOption => {
  const uid = Math.random().toString(36).substr(2, 6);

  return {
    uid,
    props: {
      disabled: false,
      selected: false,
      hidden: false
    },
    value: (!option || (typeof option == 'object' && Object.keys(option).length == 0)) ? '-' : option
  };
};
