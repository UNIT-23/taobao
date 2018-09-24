const { getTimeForZone } = require('./moment-datetime')
module.exports = {
            app_key: "test",
			app_secret : "test",
                format: "json",
                session: "6102926864b22a00f98c901af68b11731417467b2a875522054718218",
                sign_method: "hmac",
                timestamp: getTimeForZone("Asia/Ulaanbaatar", "YYYY-MM-DD HH:mm:ss"),
                v: "2.0",
                sandbox: true

}
