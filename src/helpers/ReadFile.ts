import path from 'path'
import { readFile } from 'fs'
import { promisify } from 'util'
import { logger } from '../utils/loggers'

export async function readPublicKey():Promise<string> {
  logger.info(promisify(readFile)(
    path.join(__dirname, '../../keys/public.pem'),
    'utf-8'
  ))
  return promisify(readFile)(
    path.join(__dirname, '../../keys/public.pem'),
    'utf-8'
  );
}

export async function readPrivateKey():Promise<string> {
  return promisify(readFile)(
    path.join(__dirname, '../../keys/private.pem'),
    'utf-8'
  );
}
