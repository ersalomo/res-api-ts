import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { UserValidate } from '../validations/user.validation'
import { logger } from '../utils/loggers'
import { UserService } from '../services/auth.srv'
import { hashing, checkPassword } from '../utils/hashing';
// import UserType from '../types/user.type';
import { signJWT, verifyJWT } from '../utils/jwt';

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

  async createSession(req: Request, res: Response): Promise<any> {
    const { error, value } = UserValidate.loginValidate(req.body);
    if (error) {
      return res.status(400).send({
        status: false,
        statusCode: res.statusCode,
        message: error.details[0].message
      });
    }
    try {
      const user: any = await UserService.findUserByEmail(value.email);
      const isValid = checkPassword(value.password, user.password)

      if (!isValid) {
        return res.status(401).json({
          message: 'invalid email or password'
        });
      }
      const accessToken = signJWT({ ...user }, { expiresIn: '1d' });
      const refreshToken = signJWT({ ...user }, { expiresIn: '1year' });
      return res.status(200).json({
        status: true,
        statusCode: res.statusCode,
        message: 'Login success',
        token: { accessToken, refreshToken }
      });
    } catch (err) {
      console.log(err)
      logger.error('Err: login controller', err);
      return res.status(500).json({
        status: false,
        statusCode: res.statusCode,
        message: 'There something went error'
      });
    }
  },

  async refreshSession(req:Request, res:Response) {
    const { error, value } = UserValidate.refreshTokenValidate(req.body);
    if (error) {
      return res.status(400).send({
        status: false,
        statusCode: res.statusCode,
        message: error.details[0].message
      });
    }
    try {
      const { decoded }:any = verifyJWT(value.refreshToken);
      const user = UserService.findUserByEmail(decoded._doc.email);
      if (!user) return false;
      const accessToken = signJWT({
        ...user
      }, {
        expiresIn: '1d'
      });
      return res.status(200).send({
        status: 'success',
        accessToken,
        message: 'Successfully refresh token authentication',
      });
    } catch (err) {
      logger.error('Err: Error AuthController refresh session', err);
      return res.status(422).send({
        status: false,
        statusCode: res.statusCode,
        message: err,
      });
    }
  },
};
