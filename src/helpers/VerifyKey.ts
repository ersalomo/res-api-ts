import forge from 'node-forge'
import { logger } from '../utils/loggers';

function isPrivateKeyValid(privateKey: string): boolean {
  try {
    forge.pki.privateKeyFromPem(privateKey);
    return true;
  } catch (error) {
    return false;
  }
}

function isPublicKeyValid(publicKey:string):boolean {
  try {
    forge.pki.publicKeyFromPem(publicKey);
    return true;
  } catch (error) {
    logger.error(error)
    return false;
  }
}

export {
  isPublicKeyValid,
  isPrivateKeyValid
}
