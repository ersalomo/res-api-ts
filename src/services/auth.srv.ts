import { UserModel } from '../models/user.model';
import { logger } from '../utils/loggers';
import UserType from '../types/user.type';

export const UserService = {
  async createUser(payload: UserType) {
    logger.info('user-create: ')
    return await UserModel.create(payload);
  },
  async getUser() {
    return await UserModel
      .find()
      .then((data) => {
        return data
      }).catch((error) => {
        logger.error(error)
      })
  }
}
