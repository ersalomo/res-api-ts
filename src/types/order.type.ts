/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum StatusOrder {
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}

export default interface OrderType {
  order_id: string,
  user_id: string,
  product_id: string,
  status: StatusOrder
}
