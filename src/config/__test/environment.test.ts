import CONFIG from '../environment';
import { isPrivateKeyValid, isPublicKeyValid } from '../../helpers/VerifyKey';

describe('Configuration Test', () => {
  test('DB configuration should be defined', () => {
    expect(CONFIG.db).toBeDefined();
  });

  test('is_dev configuration should be a boolean', () => {
    expect(typeof CONFIG.is_dev).toBe('boolean');
  });

  test('db_max_pool_size configuration should be a number', () => {
    expect(typeof CONFIG.db_max_pool_size).toBe('number');
  });

  test('db_min_pool_size configuration should be a number', () => {
    expect(typeof CONFIG.db_min_pool_size).toBe('number');
  });

  test('jwt_private_key configuration should be an async function', () => {
    expect(typeof CONFIG.jwt_private_key).toBe('function');
    expect(CONFIG.jwt_private_key.constructor.name).toBe('Function');
  });

  test('jwt_public_key configuration should be an async function', () => {
    expect(typeof CONFIG.jwt_public_key).toBe('function');
    expect(CONFIG.jwt_public_key.constructor.name).toBe('Function');
  });

  test('PRIVATE_KEY configuration should be a string', () => {
    expect(typeof CONFIG.PRIVATE_KEY).toBe('string');
  });

  test('PUBLIC_KEY configuration should be a string', () => {
    expect(typeof CONFIG.PUBLIC_KEY).toBe('string');
  });
  test('jwt_private_key configuration should be a private key', async () => {
    const privateKey = await CONFIG.jwt_private_key();
    const isPrivateKey = isPrivateKeyValid(`${privateKey}`);
    expect(isPrivateKey).toBe(true);
  });

  test('jwt_public_key configuration should be a public key', async () => {
    const publicKey = await CONFIG.jwt_public_key();
    const isPublicKey = isPublicKeyValid(`${publicKey}`);
    expect(isPublicKey).toBe(true);
  });
});
