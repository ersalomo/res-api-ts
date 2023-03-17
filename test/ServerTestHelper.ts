/* eslint-disable camelcase */
// import { v4 } from 'uuid';
// import UserTestHelper from './UserTestHelper';
import { signJWT } from '../src/utils/jwt';
import { hashing } from '../src/utils/hashing';

const ServerTestHelper = {
  async getAccessToken({
    // user_id = v4(),
    // name = 'Ersalomo',
    password = hashing('12345678'),
    role = 'user',
    email = 'user@gmail.com'
  }) {
    const payload = { email, role, password };
    // await UserTestHelper.addUser(payload)
    return signJWT({ ...payload }, { expiresIn: '1d' })
  }
};

export default ServerTestHelper;
