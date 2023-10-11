// enum / type / interface
export enum Steering {
  Manual = 'manual',
  Auto = 'auto',
  Electric = 'electric',
  Hybrid = 'hybrid',
}

export enum CityType {
  PickUp = 'pickUp',
  DropOff = 'dropOff',
}

export type Rating = 1 | 2 | 3 | 4 | 5;

export enum OrderStatus {
  InProgress = 'inProgress',
  Paid = 'paid',
  UnPaid = 'unPaid',
}

export enum PaymentMethodType {}

export enum PromoType {
  Absolute = 'absolute',
  Percentage = 'percentage',
}

export enum PaymentMethodCode {
  Cod = 'cod',
  Stripe = 'stripe',
  Paypal = 'paypal',
}

// Constants
export const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const LIMIT_PAGINATION = 9;
export const CITY_LIMIT_PAGINATION = 20;
export const OFFSET_PAGINATION = 0;
export const IS_PUBLIC_KEY = 'isPublic';

// Error code
export const CarError = {
  CAR_NOT_FOUND: 'car.CAR-0001',
};

export const OrderError = {
  CAN_NOT_ORDER: 'order.ORD-0001',
  INVALID_PICK_UP_CITY: 'order.ORD-0002',
  INVALID_DROP_OFF_CITY: 'order.ORD-0003',
  CONFLICT_RENTAL_TIME: 'order.ORD-0004',
  INVALID_RENTAL_TIME: 'order.ORD-0005',
  RENTAL_TIME_IN_PAST: 'order.ORD-0006',
};

export const PromoError = {
  PROMO_NOT_FOUND: 'promo.PRO-0001',
  PROMO_QUANTITY_NOT_ENOUGH: 'promo.PRO-0003',
};

export const SystemError = {
  OBJECT_NOT_FOUND: 'system.CUS-0602',
  INVALID_PARAMETER: 'system.CUS-0603',
};

export const TokenError = {
  TOKEN_NOT_FOUND: 'token.TOK-0001',
  TOKEN_EXPIRED: 'user.CUS-0405',
};

export const UserError = {
  INVALID_EMAIL: 'user.USE-0001',
  INVALID_PASSWORD: 'user.USE-0002',
  WRONG_CREDENTIALS: 'user.USE-0003',
  USERNAME_ALREADY_EXISTED: 'user.USE-0006',
  USER_NOT_FOUND: 'user.USE-0007',
  SIGNUP_FAILURE: 'user.USE-0008',
  UNAUTHORIZED_ACCESS: 'user.CUS-0405',
};
