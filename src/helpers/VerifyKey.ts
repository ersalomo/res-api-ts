import forge from 'node-forge'

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
    console.log(error)
    return false;
  }
}

export {
  isPublicKeyValid,
  isPrivateKeyValid
}
