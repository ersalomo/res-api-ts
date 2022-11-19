import Joi from 'joi'

export interface ProductInterface {
    name: string,
    price: number
}

export const createProductValidate = (payload: ProductInterface) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
  })
  return schema.validate(payload)
}
