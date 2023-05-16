import { v4 } from 'uuid';
import UserType from '../src/types/user.type';
import { UserService } from '../src/database/services/auth.srv';

const UserTestHelper = {
  async addUser(user:UserType = {
    user_id: v4(),
    name: 'Ersalomo',
    password: '12345678',
    role: 'user',
    email: 'ersalomo@gmail.com'
  }) {
    await UserService.createUser(user);
  },
};

export default UserTestHelper;
