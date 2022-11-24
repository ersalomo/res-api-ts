import Joi from 'joi'
import ProductType from '../types/products.types'

export const createProductValidate = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    type: Joi.string().required(),
    size: Joi.string().required(),
  })
  return schema.validate(payload)
}
