import * as crypto from 'crypto'
export function hashString(str,method="sha256"){
    return crypto.createHash(method).update(str).digest('hex');
}