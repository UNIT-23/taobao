const crypto = require('crypto')

module.exports = {
  crypt: crypt
}

function crypt (text, algo, key) {
  text = String(text || '')
  algo = algo || 'sha256'
  key = key || ''
  if (algo === 'md5') {
    return crypto.createHash(algo).update(Buffer.from(text)).digest('hex')
  } else if (algo === 'hmac') {
    return crypto.createHmac('md5', key)
      .update(text)
      .digest('hex')
      .toString()
      .toUpperCase()
  } else {
    const c = crypto.createHmac('md5', key)
      .update(Buffer.from(text)).digest('hex')
    return c
  }
}
