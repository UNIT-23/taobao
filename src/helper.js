import crypto from 'crypto'

export const crypt = (text, algo, key) => {
  text = String(text || '')
  algo = algo || 'sha256'
  key = key || ''

  if (algo === 'md5') {
    return crypto.createHash(algo).update(Buffer.from(text)).digest('hex')
  } else {
    return crypto.createHmac('md5', key).update(Buffer.from(text)).digest('hex')
  }
}

export const dateString = d => d.getFullYear().toString() + '-' +
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
