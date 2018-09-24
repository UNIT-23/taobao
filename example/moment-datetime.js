const moment = require('moment')
const momentTz = require('moment-timezone')

module.exports.getTimeForZone = function (tz, format = 'hh:mm A') {
  return tz
    ? momentTz(moment())
      .tz(tz)
      .format(format)
    : moment().format(format)
}
