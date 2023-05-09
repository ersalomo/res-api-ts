import path from 'path'
import { readFile } from 'fs'
import { promisify } from 'util'

export async function readPublicKey():Promise<string> {
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
