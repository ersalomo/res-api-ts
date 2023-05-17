import Joi from 'joi'
import ProductType from '../../database/types/products.types'

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
export const updateProductValidate = (payload:ProductType) => {
  const schema = Joi.object({
    name: Joi.string().allow('', null),
    price: Joi.number().allow('', null),
    type: Joi.string().allow('', null),
    size: Joi.string().allow('', null),
  })
  return schema.validate(payload)
}
