export enum Steering {
  Manual = 'manual',
  Auto = 'auto',
  Electric = 'electric',
  Hybrid = 'hybrid',
}

export type Rating = 1 | 2 | 3 | 4 | 5;

export enum orderStatus {
  InProgress = 'inProgress',
  Paid = 'paid',
  UnPaid = 'unPaid',
}

export enum PaymentMethodType {}

export enum PromoType {
  Absolute = 'absolute',
  Percentage = 'percentage',
}
