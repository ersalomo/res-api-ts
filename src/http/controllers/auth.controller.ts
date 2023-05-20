import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { UserValidate } from '../../http/validations/user.validation'
import { UserService } from '../../database/services/auth.srv'
import { hashing, checkPassword } from '../../utils/hashing';
import { verifyJWT, signJWT } from '../../utils/jwt';
import NotFoundResponse from '../responses/ApiResponse/NotFoundResponse'
import AuthFailureResponse from '../responses/ApiResponse/AuthFailureResponse'
import SuccessResponse from '../../http/responses/ApiResponse/SuccessResponse'
import BadPayloadRequest from '../../http/responses/ApiResponse/BadPayloadRequest'
import SuccessMsgResponse from '../responses/ApiResponse/SuccessMsgResponse'
import BadRequestResponse from '../responses/ApiResponse/BadRequestResponse';

export const AuthController = {
  async createUser(req: Request, res: Response):Promise<any> {
    req.body.user_id = uuidv4();
    const { error, value } = UserValidate.createUserValidate(req.body);

    if (error) return new BadPayloadRequest(error.details[0].message).send(res)

    value.password = hashing(value.password)
    await UserService.createUser(value)
    return new SuccessMsgResponse('user created').send(res)
  },

  async getUser(req: Request, res: Response) {
    let users:any = await UserService.getUser()
    users = Array.from(users)
    if (users.length < 0) return new NotFoundResponse('Not found user')
    return new SuccessResponse('success', users).send(res)
  },

  async createSession(req: Request, res: Response): Promise<any> {
    const { error, value } = UserValidate.loginValidate(req.body);
    if (error) return new BadRequestResponse(error.details[0].message).send(res)

    const user: any = await UserService.findUserByEmail(value.email);
    if (!user) return new NotFoundResponse('Not found user').send(res)

    const isValid = checkPassword(value.password, user.password)
    if (!isValid) return new AuthFailureResponse('Invalid email or password').send(res);

    const accessToken = await signJWT({ ...user }, { expiresIn: '1d' });
    const refreshToken = await signJWT({ ...user }, { expiresIn: '10days' });
    return new SuccessResponse('success', { accessToken, refreshToken }).send(res);
  },

  async refreshSession(req:Request, res:Response) {
    const { error, value } = UserValidate.refreshTokenValidate(req.body);
    if (error) {
      return new BadPayloadRequest(error.details[0].message).send(res)
    }
    const { decoded }:any = await verifyJWT(value.refreshToken);
    const user = UserService.findUserByEmail(decoded._doc.email);
    if (!user) return new NotFoundResponse('Not found user').send(res)
    const accessToken = signJWT({ ...user }, {
      expiresIn: '1d'
    });
    return new SuccessResponse('Successfully refresh token authentication', accessToken).send(res)
  },
};
