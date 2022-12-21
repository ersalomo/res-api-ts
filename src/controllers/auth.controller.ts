import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { UserValidate } from '../validations/user.validation'
import { logger } from '../utils/loggers'
// import UserType from '../types/user.type';
import { UserService } from '../services/auth.srv'
import hashing from '../utils/hashing';

export const AuthController = {
  async createUser(req: Request, res: Response):Promise<any> {
    req.body.user_id = uuidv4();
    const { error, value } = UserValidate.createUserValidate(req.body);

    if (error) {
      logger.error('Err:[error create user]', error.details[0].message)
      return res.status(422).send({
        status: false,
        statusCode: res.statusCode,
        message: error,
      });
    }

    try {
      value.password = hashing(value.password)
      await UserService.createUser(value)
      return res.status(201).send({
        status: true,
        statusCode: res.statusCode,
        message: 'Successfully create new user',
      })
    } catch (err) {
      logger.error('Err: Error server auth controller', err);
      return res.status(422).send({
        status: false,
        statusCode: res.statusCode,
        message: err,
      });
    }
  },

  async getUser(req: Request, res: Response) {
    let users:any = await UserService.getUser()
    users = Array.from(users)
    if (users.length < 0) {
      return res.status(404).send({
        status: false,
        statusCode: res.statusCode,
        message: 'User not found!'
      })
    }
    return res.status(200).send({
      status: true,
      statusCode: res.statusCode,
      data: users
    })
  },
};
