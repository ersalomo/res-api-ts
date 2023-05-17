import Joi from 'joi'
import UserType from '../../database/types/user.type'

export const UserValidate = {
  createUserValidate(payload: UserType) {
    const schema = Joi.object({
      user_id: Joi.string().required(),
      email: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    })
    return schema.validate(payload)
  },

  loginValidate(payload: UserType) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    });
    return schema.validate(payload)
  },

  refreshTokenValidate(payload: string) {
    const schema = Joi.object({
      refreshToken: Joi.string().required(),
    });
    return schema.validate(payload)
  }

}
