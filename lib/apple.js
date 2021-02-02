const crypto = require('crypto')

const dayjs = require('dayjs')
const SignJWT = require('jose/jwt/sign')

const privateKey = crypto.createPrivateKey(process.env.APPLE_PRIVATE_KEY)

export function signAuthKey() {
  const now = dayjs()

  return new SignJWT({})
    .setProtectedHeader({
      kid: '4256GNLKDV',
      alg: 'ES256',
      crv: 'P-256',
    })
    .setIssuer('5JF28JDTVC')
    .setIssuedAt(now.unix())
    .setExpirationTime(now.add(1, 'week').unix())
    .sign(privateKey)
}
