import Joi from 'joi';
import CartType from '../../database/types/cart.type';

export const CartValidate = {
  createCartValidate(payload: CartType) {
    const schema = Joi.object({
      cart_id: Joi.string().required(),
      user_id: Joi.string().required(),
      product_id: Joi.string().required(),
      count: Joi.number().default(1),
    });
    return schema.validate(payload);
  },
}
