import { PromoType } from 'src/common/constants';

export const promos = [
  {
    code: 'FJW123NDN',
    type: PromoType.Absolute,
    discount: 20,
    quantity: 100,
  },
  {
    code: 'AKW234DMF',
    type: PromoType.Percentage,
    discount: 20,
    quantity: 100,
  },
];
