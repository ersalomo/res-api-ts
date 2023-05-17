import { UserValidate } from '../user.validation';
import UserType from '../../../database/types/user.type';

describe('user-validate', () => {
  it('it should validate the user payload correctly', async () => {
    // Arrange
    const uuid = () => 'user-123' // stub
    const payload = {
      user_id: uuid(),
      email: 'user@example.com',
      name: 'user-123',
      password: 'password',
      role: 'user'
    }
    // Act
    const { value } = UserValidate.createUserValidate(payload as UserType)
    // Assert
    expect(value).toEqual({
      user_id: 'user-123',
      email: 'user@example.com',
      name: 'user-123',
      password: 'password',
      role: 'user'
    })
  })
})
