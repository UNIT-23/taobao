const crypto = require('crypto')

module.exports = {
  crypt     : crypt,
  dateString: dateString
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

function dateString (d) {
  return d.getFullYear().toString() + '-' +
      ((d.getMonth() + 1).toString().length === 2
        ? (d.getMonth() + 1).toString() : '0' +
          (d.getMonth() + 1).toString()) + '-' +
      (d.getDate().toString().length === 2 ? d.getDate().toString() : '0' +
          d.getDate().toString()) + ' ' +
      (d.getHours().toString().length === 2 ? d.getHours().toString() : '0' +
          d.getHours().toString()) + ':' +
      ((parseInt(d.getMinutes() / 5) * 5).toString().length === 2
        ? (parseInt(d.getMinutes() / 5) * 5).toString() : '0' +
          (parseInt(d.getMinutes() / 5) * 5).toString()) + ':00'
}
